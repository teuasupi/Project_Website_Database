const pool = require("../config/config");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "upiteknikelektro@gmail.com",
    pass: process.env.PASSWORD_GMAIL,
  },
});

class UserModel {
  static async query(sql, params) {
    try {
      const [rows] = await pool.query(sql, params);
      return rows;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database query failed");
    }
  }

  static getAllUsers() {
    return this.query(
      `SELECT id, email, fullName, graduationYear, nim, major, phoneNumber, address, profilePhoto, role, currentCompany, position FROM Users`
    );
  }

  static getUserById(id) {
    return this.query(
      `SELECT id, email, fullName, graduationYear, nim, major, phoneNumber, address, profilePhoto, role, currentCompany, position FROM Users WHERE id = ?`,
      [id]
    );
  }

  static async registerUser(email, password, fullName) {
    if (!email || !password || !fullName)
      throw new Error("Email, password, and fullName are required");
    const existingUser = await this.query(
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

    const hashedPassword = await bcryptjs.hash(password, 10);
    await this.query(
      "INSERT INTO Users (email, password, fullName) VALUES (?, ?, ?)",
      [email, hashedPassword, fullName]
    );
    return { message: "User registered successfully" };
  }

  static async loginUser(email, password) {
    if (!email || !password) throw new Error("Email and password are required");
    const users = await this.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) throw new Error("Invalid email or password");

    const user = users[0];
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    delete user.password;
    return { message: "Login successful", token, user };
  }

  static async updateUser(id, updateData) {
    const fields = Object.keys(updateData);
    if (fields.length === 0) throw new Error("No fields to update");

    const query = `UPDATE Users SET ${fields
      .map((f) => `${f} = ?`)
      .join(", ")} WHERE id = ?`;
    const values = [...fields.map((f) => updateData[f]), id];
    await this.query(query, values);

    return { message: "User updated successfully" };
  }

  static async uploadProfilePhoto(id, file, profilePhoto) {
    const user = await this.getUserById(id);
    if (!user) throw new Error("User not found");

    if (user.profilePhoto) {
      const oldFilePath = path.join(
        __dirname,
        "../../public",
        user.profilePhoto
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

  static async deleteUser(id) {
    const user = await this.getUserById(id);
    if (!user) throw new Error("User not found");
    await this.query("DELETE FROM Users WHERE id = ?", [id]);
    return { message: "User deleted successfully" };
  }
}

module.exports = UserModel;
