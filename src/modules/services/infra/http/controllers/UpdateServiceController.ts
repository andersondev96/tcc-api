import { UpdateServiceService } from "@modules/services/services/UpdateServiceService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateServiceController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { service_id } = request.params;

        const { name, description, price, category } = request.body;

        const updateServiceService = container.resolve(UpdateServiceService);

        const service = await updateServiceService.execute({
            id: service_id,
            name,
            description,
            price,
            category
        });

        return response.status(201).json(service);
    }
}