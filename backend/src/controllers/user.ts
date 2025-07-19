import { Request, Response } from "express";
import UserModel from "../models/user";

class UserController {
  static async handleResponse<T>(promise: Promise<T>, res: Response, successStatus: number = 200): Promise<void> {
    try {
      const result: T = await promise;
      res.status(successStatus).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static getAllUsers(req: Request, res: Response): void {
    UserController.handleResponse(UserModel.getAllUsers(), res);
  }

  static getUserById(req: Request, res: Response): void {
    const { id } = req.params;
    UserController.handleResponse(UserModel.getUserById(parseInt(id)), res);
  }

  static registerUser(req: Request, res: Response): void {
    const { email, password, fullName } = req.body;
    UserController.handleResponse(
      UserModel.registerUser(email, password, fullName),
      res,
      201
    );
  }

  static loginUser(req: Request, res: Response): void {
    const { email, password } = req.body;
    UserController.handleResponse(UserModel.loginUser(email, password), res);
  }

  static updateUser(req: Request, res: Response): void {
    const { id } = req.params;
    UserController.handleResponse(UserModel.updateUser(parseInt(id), req.body), res);
  }

  static uploadProfilePhoto(req: Request, res: Response): void {
    const { id } = req.params;
    UserController.handleResponse(
      UserModel.uploadProfilePhoto(parseInt(id), req.file!, req.body.profilePhoto),
      res
    );
  }

  static deleteUser(req: Request, res: Response): void {
    const { id } = req.params;
    UserController.handleResponse(UserModel.deleteUser(parseInt(id)), res);
  }
}

export default UserController;