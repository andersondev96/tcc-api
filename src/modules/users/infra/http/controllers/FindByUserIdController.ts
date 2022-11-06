import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindByUserIdService } from "@modules/users/services/FindByUserIdService";

export class FindByUserIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const findByUserIdService = container.resolve(
            FindByUserIdService
        );

        const user = await findByUserIdService.execute(id);

        return response.json(user);
    }
}
