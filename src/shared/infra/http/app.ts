import "@shared/container";
import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import routes from "./routes";

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import upload from "@config/upload";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
