import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Schedule } from "../infra/prisma/entities/Schedule";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

interface ISchedules {
  id?: string;
  weekday: string;
  opening_time: string;
  closing_time: string;
  lunch_time?: string;
  company_id?: string;
}
interface IRequest {
  company_id: string;
  schedules: ISchedules[];
}

@injectable()
export class UpdateScheduleService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("SchedulesRepository")
    private scheduleRepository: ISchedulesRepository
  ) { }

  public async execute({ company_id, schedules }: IRequest): Promise<ISchedules[]> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Compony not found");
    }

    const listSchedules = await this.scheduleRepository.findSchedulesByCompany(company.id);

    const newSchedules: ISchedules[] = [];
    const schedulesWithoutId: ISchedules[] = [];

    for (const schedule of schedules) {
      if (!schedule.id) {
        schedulesWithoutId.push(schedule);
        continue;
      }

      const oldScheduleIndex = listSchedules.findIndex(s => s.id === schedule.id);

      if (oldScheduleIndex === -1) {
        newSchedules.push(schedule);
      } else {
        const oldSchedule = listSchedules[oldScheduleIndex];
        if (
          oldSchedule.weekday !== schedule.weekday ||
          oldSchedule.opening_time !== schedule.opening_time ||
          oldSchedule.closing_time !== schedule.closing_time ||
          oldSchedule.lunch_time !== schedule.lunch_time
        ) {
          newSchedules.push(schedule);
        }

        listSchedules.splice(oldScheduleIndex, 1);
      }
    }

    // Deleta os schedules que não existem mais
    for (const schedule of listSchedules) {
      await this.scheduleRepository.delete(schedule.id);
    }

    // Insere ou atualiza os schedules
    const updatedSchedules: Schedule[] = [];

    if (schedulesWithoutId.length > 0) {
      for (const schedule of schedulesWithoutId) {
        const addNewSchedules = await this.scheduleRepository.create({
          ...schedule,
          company_id
        });

        updatedSchedules.push(addNewSchedules);

      }
    }

    for (const schedule of newSchedules) {
      const updatedSchedule = await this.scheduleRepository.update(schedule);
      updatedSchedules.push(updatedSchedule);
    }

    return updatedSchedules;
  }
}