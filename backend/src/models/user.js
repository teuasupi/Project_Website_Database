const pool = require("../config/config");

class User {
  static async getAllUsers(req, res, next) {
    try {
      const [rows] = await pool.query(`
              SELECT id, email, fullName, graduationYear, nim, major, 
              phoneNumber, address, profilePhoto, role, currentCompany, position 
              FROM Users
            `);

      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async getUserById(req, res, next) {
    try {
      const [rows] = await pool.query(
        `
          SELECT id, email, fullName, graduationYear, nim, major, 
          phoneNumber, address, profilePhoto, role, currentCompany, position 
          FROM Users WHERE id = ?
        `,
        [req.params.id]
      );

      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(rows[0]);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  static async createUser(req, res, next) {
    try {
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { email, password, fullName } = req.body;

      // Validate required fields
      if (!email || !password || !fullName) {
        return res
          .status(400)
          .json({ error: "Email, password, and fullName are required" });
      }

      // Check if email already exists
      const [existingUser] = await pool.query(
        "SELECT id FROM Users WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        return res.status(409).json({ error: "Email already in use" });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert new user
      const [result] = await pool.query(
        `
          INSERT INTO Users (
            email, password, fullName
          ) VALUES (?, ?, ?)
        `,
        [email, hashedPassword, fullName]
      );

      res.status(201).json({
        id: result.insertId,
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // Find user by email
      const [users] = await pool.query("SELECT * FROM Users WHERE email = ?", [
        email,
      ]);

      if (users.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = users[0];

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Remove password from response
      const userResponse = { ...user };
      delete userResponse.password;

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" } // Token berlaku 24 jam
      );

      res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Login failed" });
    }
  }

  static async updateUser(req, res, next) {
    try {
      const {
        email,
        password,
        fullName,
        graduationYear,
        nim,
        major,
        phoneNumber,
        address,
        role,
        currentCompany,
        position,
      } = req.body;

      // Check if user exists
      const [existingUser] = await pool.query(
        "SELECT id FROM Users WHERE id = ?",
        [req.params.id]
      );
      if (existingUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // If email is being updated, check if the new email is already in use
      if (email) {
        const [emailCheck] = await pool.query(
          "SELECT id FROM Users WHERE email = ? AND id != ?",
          [email, req.params.id]
        );

        if (emailCheck.length > 0) {
          return res.status(409).json({ error: "Email already in use" });
        }
      }

      // Prepare update data
      let updateData = {};
      let params = [];
      let query = "UPDATE Users SET ";

      // Only update fields that are provided
      if (email) {
        updateData.email = email;
      }
      if (password) {
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
      if (fullName) updateData.fullName = fullName;
      if (graduationYear !== undefined)
        updateData.graduationYear = graduationYear;
      if (nim) updateData.nim = nim;
      if (major) updateData.major = major;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (address) updateData.address = address;
      if (role) updateData.role = role;
      if (currentCompany) updateData.currentCompany = currentCompany;
      if (position) updateData.position = position;

      // Build query dynamically
      const entries = Object.entries(updateData);
      if (entries.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      entries.forEach(([key, value], index) => {
        query += `${key} = ?`;
        params.push(value);
        if (index < entries.length - 1) query += ", ";
      });

      query += " WHERE id = ?";
      params.push(req.params.id);

      // Execute update
      await pool.query(query, params);

      res.status(200).json({
        id: req.params.id,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const {
        email,
        password,
        fullName,
        graduationYear,
        nim,
        major,
        phoneNumber,
        address,
        profilePhoto,
        role,
        currentCompany,
        position,
      } = req.body;

      // Check if user exists
      const [existingUser] = await pool.query(
        "SELECT id FROM Users WHERE id = ?",
        [req.params.id]
      );
      if (existingUser.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // If email is being updated, check if the new email is already in use
      if (email) {
        const [emailCheck] = await pool.query(
          "SELECT id FROM Users WHERE email = ? AND id != ?",
          [email, req.params.id]
        );

        if (emailCheck.length > 0) {
          return res.status(409).json({ error: "Email already in use" });
        }
      }

      // Prepare update data
      let updateData = {};
      let params = [];
      let query = "UPDATE Users SET ";

      // Only update fields that are provided
      if (email) {
        updateData.email = email;
      }
      if (password) {
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(password, saltRounds);
      }
      if (fullName) updateData.fullName = fullName;
      if (graduationYear !== undefined)
        updateData.graduationYear = graduationYear;
      if (nim) updateData.nim = nim;
      if (major) updateData.major = major;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (address) updateData.address = address;
      if (profilePhoto) updateData.profilePhoto = profilePhoto;
      if (role) updateData.role = role;
      if (currentCompany) updateData.currentCompany = currentCompany;
      if (position) updateData.position = position;

      // Build query dynamically
      const entries = Object.entries(updateData);
      if (entries.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      entries.forEach(([key, value], index) => {
        query += `${key} = ?`;
        params.push(value);
        if (index < entries.length - 1) query += ", ";
      });

      query += " WHERE id = ?";
      params.push(req.params.id);

      // Execute update
      await pool.query(query, params);

      res.status(200).json({
        id: req.params.id,
        message: "User updated successfully",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }
}
