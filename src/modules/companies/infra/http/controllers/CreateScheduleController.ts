import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateScheduleService } from "@modules/companies/services/CreateScheduleService";

export class CreateScheduleController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const {
            day_of_week,
            opening_time,
            closing_time,
            company_id,
        } = request.body;

        const createScheduleService = container.resolve(CreateScheduleService);

        const schedule = await createScheduleService.execute({
            day_of_week,
            opening_time,
            closing_time,
            company_id,
        });

        return response.status(201).json(schedule);
    }
}