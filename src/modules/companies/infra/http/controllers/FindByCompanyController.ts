import { FindByCompanyService } from "@modules/companies/services/FindByCompanyService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindByCompanyController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.body;

        const findByCompanyService = container.resolve(FindByCompanyService);

        const company = await findByCompanyService.execute(id);

        console.log(company);

        return response.json(company);
    }
}