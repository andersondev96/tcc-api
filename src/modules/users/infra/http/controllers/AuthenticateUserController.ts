import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "@modules/users/services/AuthenticateUserService";

export class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const user = await authenticateUserService.execute({
            email,
            password,
        });

        return response.json(user);
    }
}
