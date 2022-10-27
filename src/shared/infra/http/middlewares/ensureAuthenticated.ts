import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "00fad44d57430e0313bc088de4e344be") as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError("Invalid token!");
    }
}