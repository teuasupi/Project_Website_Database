import pool from "../config/config";
import * as nodemailer from "nodemailer";
import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";
import { User, AuthResponse } from "../types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upiteknikelektro@gmail.com",
    pass: process.env.PASSWORD_GMAIL,
  },
});

class UserModel {
  static async query(sql: string, params?: any[]): Promise<any> {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database query failed");
    }
  }

  static async getAllUsers(): Promise<Omit<User, "password">[]> {
    return this.query(
      `SELECT id, email, fullName, graduationYear, nim, major, phoneNumber, address, profilePhoto, role, currentCompany, position FROM Users`
    );
  }

  static async getUserById(id: number): Promise<Omit<User, "password">[]> {
    return this.query(
      `SELECT id, email, fullName, graduationYear, nim, major, phoneNumber, address, profilePhoto, role, currentCompany, position FROM Users WHERE id = ?`,
      [id]
    );
  }

  static async registerUser(email: string, password: string, fullName: string): Promise<{ message: string }> {
    if (!email || !password || !fullName)
      throw new Error("Email, password, and fullName are required");
    
    const existingUser: User[] = await this.query(
      "SELECT id FROM Users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) throw new Error("Email already in use");

    await transporter.sendMail({
      from: "upiteknikelektro@gmail.com",
      to: "admin@example.com",
      subject: "New User Registration Request",
      text: `A new user with fullName: ${fullName} tried to register but was not found in the system.`,
    });

    const hashedPassword: string = await bcryptjs.hash(password, 10);
    await this.query(
      "INSERT INTO Users (email, password, fullName) VALUES (?, ?, ?)",
      [email, hashedPassword, fullName]
    );
    return { message: "User registered successfully" };
  }

  static async loginUser(email: string, password: string): Promise<AuthResponse> {
    if (!email || !password) throw new Error("Email and password are required");
    
    const users: User[] = await this.query("SELECT * FROM Users WHERE email = ?", [email]);
    if (users.length === 0) throw new Error("Invalid email or password");

    const user: User = users[0];
    const isPasswordValid: boolean = await bcryptjs.compare(password, user.password!);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token: string = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    const { password: _, ...userWithoutPassword } = user;
    return { message: "Login successful", token, user: userWithoutPassword };
  }

  static async updateUser(id: number, updateData: Partial<Omit<User, "id">>): Promise<{ message: string }> {
    const fields: string[] = Object.keys(updateData);
    if (fields.length === 0) throw new Error("No fields to update");

    const query: string = `UPDATE Users SET ${fields
      .map((f) => `${f} = ?`)
      .join(", ")} WHERE id = ?`;
    const values: any[] = [...fields.map((f) => (updateData as any)[f]), id];
    await this.query(query, values);

    return { message: "User updated successfully" };
  }

  static async uploadProfilePhoto(id: number, file: Express.Multer.File, profilePhoto: string): Promise<{ message: string }> {
    const user: Omit<User, "password">[] = await this.getUserById(id);
    if (!user || user.length === 0) throw new Error("User not found");

    if (user[0].profilePhoto) {
      const oldFilePath: string = path.join(
        __dirname,
        "../../public",
        user[0].profilePhoto
      );
      fs.unlink(oldFilePath, (err) => {
        if (err && err.code !== "ENOENT")
          console.error("Error deleting old profile photo:", err);
      });
    }

    await this.query("UPDATE Users SET profilePhoto = ? WHERE id = ?", [
      profilePhoto,
      id,
    ]);
    return { message: "Profile photo updated successfully" };
  }

  static async deleteUser(id: number): Promise<{ message: string }> {
    const user: Omit<User, "password">[] = await this.getUserById(id);
    if (!user || user.length === 0) throw new Error("User not found");
    
    await this.query("DELETE FROM Users WHERE id = ?", [id]);
    return { message: "User deleted successfully" };
  }
}

export default UserModel;