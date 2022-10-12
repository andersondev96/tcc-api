import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindByUserIdService } from "@modules/users/services/FindByUserIdService";

export class FindByUserIdController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;

        const findByUserIdService = container.resolve(
            FindByUserIdService
        );

        const user = await findByUserIdService.execute(user_id);

        return response.json(user);
    }
}
