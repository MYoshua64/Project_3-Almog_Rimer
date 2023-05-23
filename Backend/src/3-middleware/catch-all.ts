import { NextFunction, Request, Response } from "express";
import logger from "../4-utils/logger";
import appConfig from "../4-utils/app-config";

function catchAll(
  err: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Display error:
  console.log(err);

  // Find status code:
  const statusCode = err.status || 500; // Short Circuit

  //Log error to file
  logger.logError(err.message, err);

  const errorMessage =
    appConfig.isProduction && statusCode >= 500
      ? "An error occurred, try again"
      : err.message;

  // Send back error details to frontend:
  response.status(statusCode).send(errorMessage);
}

export default catchAll;
