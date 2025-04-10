const UserModel = require("../models/user");

class UserController {
  static async handleResponse(promise, res, successStatus = 200) {
    try {
      const result = await promise;
      res.status(successStatus).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static getAllUsers(req, res) {
    UserController.handleResponse(UserModel.getAllUsers(), res);
  }

  static getUserById(req, res) {
    const { id } = req.params;
    UserController.handleResponse(UserModel.getUserById(id), res);
  }

  static registerUser(req, res) {
    const { email, password, fullName } = req.body;
    UserController.handleResponse(
      UserModel.registerUser(email, password, fullName),
      res,
      201
    );
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    UserController.handleResponse(UserModel.loginUser(email, password), res);
  }

  static updateUser(req, res) {
    const { id } = req.params;
    UserController.handleResponse(UserModel.updateUser(id, req.body), res);
  }

  static uploadProfilePhoto(req, res) {
    const { id } = req.params;
    UserController.handleResponse(
      UserModel.uploadProfilePhoto(id, req.file, req.body.profilePhoto),
      res
    );
  }

  static deleteUser(req, res) {
    const { id } = req.params;
    UserController.handleResponse(UserModel.deleteUser(id), res);
  }
}

module.exports = UserController;
