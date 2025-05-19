const { Profile, User } = require('../models');
const { Op } = require('sequelize');

class ProfileController {
  static async createProfile(req, res, next) {
    try {
      const existingProfile = await Profile.findOne({
        where: { userId: req.body.userId }
      });

      if (existingProfile) {
        return res.status(400).json({
          success: false,
          message: 'Profile already exists for this user'
        });
      }

      const userExists = await User.findByPk(req.body.userId);
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const profile = await Profile.create(req.body);
      
      return res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllProfiles(req, res, next) {
    try {
      const {
        profileType,
        specialization,
        degree,
        industry,
        currentSemester,
        limit = 10,
        offset = 0
      } = req.query;

      const whereConditions = {};
      
      if (profileType) whereConditions.profileType = profileType;
      if (specialization) whereConditions.specialization = specialization;
      if (degree) whereConditions.degree = degree;
      if (industry) whereConditions.industry = industry;
      if (currentSemester) whereConditions.currentSemester = currentSemester;

      const { count, rows: profiles } = await Profile.findAndCountAll({
        where: whereConditions,
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username'] }]
      });

      return res.status(200).json({
        success: true,
        message: 'Profiles retrieved successfully',
        data: {
          total: count,
          profiles,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfileById(req, res, next) {
    try {
      const { id } = req.params;
      
      const profile = await Profile.findByPk(id, {
        include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username'] }]
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfileByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      
      const profile = await Profile.findOne({
        where: { userId },
        include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username'] }]
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found for this user'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      
      const profile = await Profile.findByPk(id);

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
      }

      if (req.body.userId && req.body.userId !== profile.userId) {
        const userExists = await User.findByPk(req.body.userId);
        if (!userExists) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }
      }

      await profile.update(req.body);
      
      const updatedProfile = await Profile.findByPk(id, {
        include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username'] }]
      });

      return res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedProfile
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProfile(req, res, next) {
    try {
      const { id } = req.params;
      
      const profile = await Profile.findByPk(id);

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Profile not found'
        });
      }

      await profile.destroy();
      
      return res.status(200).json({
        success: true,
        message: 'Profile deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchProfiles(req, res, next) {
    try {
      const { query, limit = 10, offset = 0 } = req.query;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const { count, rows: profiles } = await Profile.findAndCountAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: `%${query}%` } },
            { lastName: { [Op.like]: `%${query}%` } },
            { city: { [Op.like]: `%${query}%` } },
            { specialization: { [Op.like]: `%${query}%` } },
            { currentCompany: { [Op.like]: `%${query}%` } },
            { currentPosition: { [Op.like]: `%${query}%` } },
            { industry: { [Op.like]: `%${query}%` } }
          ]
        },
        limit: parseInt(limit),
        offset: parseInt(offset),
        include: [{ model: User, as: 'user', attributes: ['id', 'email', 'username'] }]
      });

      return res.status(200).json({
        success: true,
        message: 'Search results',
        data: {
          total: count,
          profiles,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;