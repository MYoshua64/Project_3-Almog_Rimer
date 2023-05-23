import { NextFunction, Request, Response } from "express";
import cyber from "../4-utils/cyber";

async function verifyAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await cyber.verifyAdmin(request);
    next();
  } catch (err) {
    next(err);
  }
}

export default verifyAdmin;
