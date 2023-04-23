import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateScheduleService } from "@modules/companies/services/UpdateScheduleService";

export class UpdateScheduleController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const schedules = request.body.schedules;

    const updateScheduleService = container.resolve(UpdateScheduleService);

    const schedule = await updateScheduleService.execute({
      company_id: id,
      schedules
    });

    return response.status(201).json(schedule);
  }
}