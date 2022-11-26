import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateScheduleService } from "@modules/companies/services/UpdateScheduleService";

export class UpdateScheduleController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const {
      day_of_week,
      opening_time,
      closing_time,
      lunch_time,
      company_id,
    } = request.body;

    const updateScheduleService = container.resolve(UpdateScheduleService);

    const schedule = await updateScheduleService.execute({ id, day_of_week, opening_time, closing_time, company_id, lunch_time });

    return response.status(201).json(schedule);
  }
}