import { Op } from "sequelize";
import { comparePassword, hashPassword } from "../helpers/bcryptJsHelper";
import { generateTokenCrypto } from "../helpers/cryptoHelper";
import { generateToken } from "../helpers/jwtHelper";
import { sendMail } from "../helpers/mailer";
const { User, Profile } = require("../models");

export class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, nim } = req.body;

      if (!email || !password || !firstName || !lastName || !nim) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const existingProfile = await Profile.findOne({
        where: { firstName, lastName, nim },
      });

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        role: null,
        verificationStatus: existingProfile ? true : false,
        resetToken: null,
        resetTokenExpires: null,
        isActive: existingProfile ? true : false,
        lastLogin: null,
      });

      if (existingProfile) {
        await existingProfile.update({ userId: newUser.id });

        return res.status(201).json({
          success: true,
          message: "User registered successfully and automatically verified",
          userId: newUser.id,
        });
      } else {
        await sendMail({
          subject: "Registration Request",
          html: `
            <h1>Registration Request</h1>
            <p>We received a registration request with the following information:</p>
            <ul>
              <li>First Name: ${firstName}</li>
              <li>Last Name: ${lastName}</li>
              <li>NIM: ${nim}</li>
              <li>Email: ${email}</li>
            </ul>
            <p>This information doesn't match any existing profile in our system.</p>
            <p>Please verify the information and take appropriate action.</p>
            <p>Thank you!</p>
          `,
        });

        return res.status(400).json({
          success: false,
          message:
            "Registration failed. Your information doesn't match our records. A notification has been sent to your email.",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }

      const user = await User.findOne({
        where: { email },
        include: [{ model: Profile, as: "profile" }],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (!user.verificationStatus) {
        return res.status(401).json({
          success: false,
          message: "Please verify your email before logging in",
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Your account has been deactivated",
        });
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      await user.update({ lastLogin: new Date() });

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          profile: user.profile,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const resetToken = generateTokenCrypto;
      const resetTokenExpires = Date.now() + 3600000;

      await user.update({
        resetToken,
        resetTokenExpires,
      });

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      await sendMail({
        subject: "Password Reset Request",
        html: `
          <h1>Password Reset Request</h1>
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
        `,
      });

      return res.status(200).json({
        success: true,
        message: "Password reset link sent to your email",
      });
    } catch (error) {
      next(error)
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Token and new password are required",
        });
      }

      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      const hashedPassword = await hashPassword(newPassword);

      await user.update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      });

      return res.status(200).json({
        success: true,
        message: "Password has been reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyAccount(req, res, next) {
    try {
      const { token } = req.params;

      const user = await User.findOne({
        where: {
          resetToken: token,
          resetTokenExpires: { [Op.gt]: Date.now() },
        },
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired verification token",
        });
      }

      await user.update({
        verificationStatus: true,
        resetToken: null,
        resetTokenExpires: null,
      });

      return res.status(200).json({
        success: true,
        message: "Account verified successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async activatedAccount(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await user.update({
        isActive: true,
      });

      const profile = await Profile.findOne({
        where: { nim: user.nim },
      });

      if (profile) {
        await profile.update({
          userId: user.id
        });
      }

      return res.status(200).json({
        success: true,
        message: "Account activated successfully",
      });

      return res.status(200).json({
        success: true,
        message: "Account activated successfully",
      });
    } catch (error) {
      next(error)
    }
  }

  static async getUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || "";

      const where = {};
      if (search) {
        where[Op.or] = [{ email: { [Op.like]: `%${search}%` } }];
      }

      const { count, rows } = await User.findAndCountAll({
        where,
        include: [{ model: Profile, as: "profile" }],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      const totalPages = Math.ceil(count / limit);

      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: rows,
        pagination: {
          total: count,
          totalPages,
          currentPage: page,
          limit,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: [{ model: Profile, as: "profile" }],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { id } = req.params;
      const { email, role, isActive, password, ...profileData } = req.body;

      const user = await User.findByPk(id, {
        include: [{ model: Profile, as: "profile" }],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const updateData = {};
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (isActive !== undefined) updateData.isActive = isActive;

      if (password) {
        updateData.password = await hashPassword(password);
      }

      await user.update(updateData);

      if (Object.keys(profileData).length > 0 && user.profile) {
        await user.profile.update(profileData);
      }

      const updatedUser = await User.findByPk(id, {
        include: [{ model: Profile, as: "profile" }],
      });

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await user.destroy();

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
