import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Schedule } from "../infra/prisma/entities/Schedule";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

interface IRequest {
  id?: string;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  lunch_time?: string;
  company_id: string;
}

@injectable()
export class UpdateScheduleService {

  constructor(
    @inject("SchedulesRepository")
    private scheduleRepository: ISchedulesRepository,
  ) { }

  public async execute(data: IRequest): Promise<Schedule> {

    const schedule = await this.scheduleRepository.findById(data.id);

    if (!schedule) {
      throw new AppError("Schedule not exist!");
    }

    if (data.company_id !== schedule.company_id) {
      throw new AppError("Company invalid!");
    }

    const update = await this.scheduleRepository.update({
      id: data.id,
      day_of_week: data.day_of_week,
      opening_time: data.opening_time,
      closing_time: data.closing_time,
      lunch_time: data.lunch_time,
      company_id: data.company_id,
    });

    return update;
  }
}