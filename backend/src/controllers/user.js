const userModel = require('./userModel');

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userModel.getUserById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createUser(req, res) {
    try {
      const {fullName } = req.body;
      const userId = await userModel.createUser(fullName);
      res.status(201).json({ id: userId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async registerUser(req, res) {
    try {
      const { email, password, fullName } = req.body;
      const userId = await userModel.registerUser(email, password, fullName);
      res.status(201).json({ id: userId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.loginUser(email, password);
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password, fullName } = req.body;
      await userModel.updateUser(id, email, password, fullName);
      res.json({ message: 'User updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userModel.deleteUser(id);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = userController;
