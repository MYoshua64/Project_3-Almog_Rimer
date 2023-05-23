import express, { Request, Response, NextFunction } from "express";
import vacationService from "../5-services/vacation-service";
import imageHandler from "../4-utils/image-handler";
import VacationModel from "../2-models/vacation-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

// GET http://localhost:4000/api/vacations/:userId
router.get(
  "/:userId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = +request.params.userId;
      const vacations = await vacationService.getAllVacations(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

// GET http://localhost:4000/api/vacations/images/:imageName
router.get(
  "/images/:imageName",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const imagePath = imageHandler.getImagePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
);

// POST http://localhost:4000/api/vacations
router.post(
  "/",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;

      const vacation = new VacationModel(request.body);
      const addedVacation = await vacationService.addVacation(vacation);
      response.status(201).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

// DELETE http://localhost:4000/api/vacations/:vacationId
router.delete(
  "/:vacationId",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.vacationId;
      await vacationService.deleteVacation(vacationId);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

// PUT http://localhost:4000/api/vacations/:vacationId
router.put(
  "/:vacationId",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const vacationData = new VacationModel(request.body);

      const updatedVacation = await vacationService.updateVacation(
        vacationData
      );
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
