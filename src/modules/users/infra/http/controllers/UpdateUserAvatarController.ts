import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarService } from "@modules/users/services/UpdateUserAvatarService";

export class UpdateUserAvatarController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const avatar_url = request.file.filename;

        const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

        await updateUserAvatarService.execute({ user_id: id, avatar_url });

        return response.json(204).send();
    }
}