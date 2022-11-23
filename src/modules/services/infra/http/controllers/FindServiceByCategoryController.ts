import { FindServiceByCategoryService } from "@modules/services/services/FindServiceByCategoryService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindServiceByCategoryController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { company_id } = request.params;

        const { category } = request.body;

        const findServiceByCategoryService = container.resolve(FindServiceByCategoryService);

        const services = await findServiceByCategoryService.execute(company_id, category);

        return response.status(201).json(services);
    }
}