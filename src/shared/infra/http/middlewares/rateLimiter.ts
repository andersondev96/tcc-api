import { NextFunction, Request, Response } from "express";
import IORedis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";


const redisClient = new IORedis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT)
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 20,
  duration: 5
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    response.status(429).json({
      error: "Too Many Requests",
      message: "You have exceeded the request rate limit. Please try again later."
    });
  }
}