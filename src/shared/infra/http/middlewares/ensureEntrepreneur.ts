import { NextFunction, Request, Response } from "express";

import { EntrepreneursRepository } from "@modules/entrepreneurs/infra/prisma/repositories/EntrepreneursRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureEntrepreneur(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const entrepreneurRepository = new EntrepreneursRepository();

  const entrepreneur = await entrepreneurRepository.findByUser(id);

  if (!entrepreneur) {
    throw new AppError("User isn't entrepreneur!");
  }

  return next();
}