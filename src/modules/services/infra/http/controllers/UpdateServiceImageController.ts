import { UpdateServiceImageService } from "@modules/services/services/UpdateServiceImageService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateServiceImageController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { service_id } = request.params;

        const image_url = request.file.filename;

        const updateServiceImageService = container.resolve(UpdateServiceImageService);

        await updateServiceImageService.execute({
            service_id,
            image_url,
        });

        return response.status(204).send();
    }
}