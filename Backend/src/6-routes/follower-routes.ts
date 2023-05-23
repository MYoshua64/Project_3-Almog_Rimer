import express, { Request, Response, NextFunction } from "express";
import followerService from "../5-services/follower-service";
import FollowerModel from "../2-models/follower-model";

const router = express.Router();

// GET http://localhost:4000/api/followers/by-vacations/
router.get(
  "/by-vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const followerCount = await followerService.getAllFollowersByVacations();
      response.json(followerCount);
    } catch (err: any) {
      next(err);
    }
  }
);

//POST http://localhost:4000/api/followers
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const follower = new FollowerModel(request.body);
      const addedFollower = await followerService.addNewFollower(follower);
      response.status(201).json(addedFollower);
    } catch (err: any) {
      next(err);
    }
  }
);

//DELETE http://localhost:4000/api/followers/user/:userId/vacation/:vacationId
router.delete(
  "/user/:userId/vacation/:vacationId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const followerLiteral = {
        userId: +request.params.userId,
        vacationId: +request.params.vacationId,
      };
      const follower = new FollowerModel(followerLiteral);
      await followerService.removeFollower(follower);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
