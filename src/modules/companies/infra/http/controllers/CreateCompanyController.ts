import { CreateCompanyService } from "@modules/companies/services/CreateCompanyService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCompanyController {

    async handle(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id;
        const {
            name,
            cnpj,
            category,
            description,
            services,
            schedule_time: {
                day_of_week,
                opening_time,
                closing_time,
                lunch_time,
            },
            physical_localization,
            telephone,
            whatsapp,
            email,
            website,
        } = request.body;

        const createCompanyService = container.resolve(CreateCompanyService);

        const company = await createCompanyService.execute({
            name,
            cnpj,
            category,
            description,
            services,
            schedule_time: {
                day_of_week,
                opening_time,
                closing_time,
                lunch_time
            },
            physical_localization,
            telephone,
            whatsapp,
            email,
            website,
            user_id
        });

        return response.status(201).json(company);

    }
}