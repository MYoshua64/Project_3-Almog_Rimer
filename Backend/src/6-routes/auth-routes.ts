import express, { Request, Response, NextFunction } from "express";
import UserModel from "../2-models/user-model";
import authService from "../5-services/auth-service";
import CredentialsModel from "../2-models/credentials-model";

const router = express.Router();

//POST http://localhost:4000/api/auth/register
router.post(
  "/register",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = new UserModel(request.body);
      const token = await authService.register(user);
      response.send(token);
    } catch (err: any) {
      next(err);
    }
  }
);

//POST http://localhost:4000/api/auth/login
router.post(
  "/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await authService.login(credentials);
      response.send(token);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
