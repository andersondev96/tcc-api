import "@shared/container";
import { CelebrateError } from "celebrate";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import routes from "./routes";


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof CelebrateError) {
    const errorBody = err.details.get('body');
    return response.status(400).json({
      status: "validate error",
      message: errorBody.message
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: err.message,
  });
});

export { app };
