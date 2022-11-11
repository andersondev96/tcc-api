import { CreateServiceOfferedService } from "@modules/companies/services/CreateServiceOfferedService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateServiceOfferedController {

    public async handle(request: Request, response: Response): Promise<Response> {
        const { description } = request.body;

        const createServiceOfferedService = container.resolve(CreateServiceOfferedService);

        const serviceOffered = await createServiceOfferedService.execute(description);

        return response.status(201).json(serviceOffered);
    }
}