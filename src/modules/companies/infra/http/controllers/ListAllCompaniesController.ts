import { ListAllCompaniesService } from "@modules/companies/services/ListAllCompaniesService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllCompaniesController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const listAllCompaniesService = container.resolve(ListAllCompaniesService);

        const companies = await listAllCompaniesService.execute();

        return response.json(companies);
    }
}