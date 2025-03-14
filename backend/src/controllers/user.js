const UserModel = require('../models/user');

class UserController  {
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getUserById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async createUser(req, res) {
    try {
      const {fullName } = req.body;
      const userId = await UserModel.createUser(fullName);
      res.status(201).json({ id: userId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async registerUser(req, res) {
    try {
      const { email, password, fullName } = req.body;
      const userId = await UserModel.registerUser(email, password, fullName);
      res.status(201).json({ id: userId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.loginUser(email, password);
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password, fullName } = req.body;
      await UserModel.updateUser(id, email, password, fullName);
      res.json({ message: 'User updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async uploadProfilePhoto(req, res) {
    try {
      const { id } = req.params;
      await UserModel
    } catch (error) {
      console.error('Error updating profile photo:', error);
      res.status(500).json({ error: 'Failed to update profile photo' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserModel.deleteUser(id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = UserController;
