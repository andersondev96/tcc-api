import { FindServiceByNameService } from "@modules/services/services/FindServiceByNameService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindServiceByNameController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { company_id } = request.params;

        const { name } = request.body;

        const findServiceByNameService = container.resolve(FindServiceByNameService);

        const services = await findServiceByNameService.execute(company_id, name);

        return response.status(201).json(services);

    }
}