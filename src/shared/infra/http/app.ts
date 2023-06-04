import "@shared/container";
import { CelebrateError } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import routes from "./routes";

const app = express();
// app.use(express.static(path.join(__dirname, "..", "..", "..", "..", "public")));

// app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
  ],

  tracesSampleRate: 1.0
});

app.use(Sentry.Handlers.requestHandler());

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket: Socket) => {
  console.log("Socket", socket.id);
});

app.use(cors());

app.use(express.json());

app.use(Sentry.Handlers.tracingHandler());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use("/company", express.static(`${upload.tmpFolder}/company`));

app.use("/service", express.static(`${upload.tmpFolder}/service`));

app.use("/budgets", express.static(`${upload.tmpFolder}/budgets`));

app.use("/company_logo", express.static(`${upload.tmpFolder}/company_logo`));

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof CelebrateError) {
    const errorBody = err.details.get("body");
    return response.status(400).json({
      status: "validate error",
      message: errorBody.message
    });
  }

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: err.message
  });
});

export { http, io };
