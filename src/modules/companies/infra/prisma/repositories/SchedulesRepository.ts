import { prisma } from "@database/prisma";
import { ICreateScheduleDTO } from "@modules/companies/dtos/ICreateScheduleDTO";
import { ISchedulesRepository } from "@modules/companies/repositories/ISchedulesRepository";

import { Schedule } from "../entities/Schedule";

export class SchedulesRepository implements ISchedulesRepository {

  public async create({
    id,
    day_of_week,
    opening_time,
    closing_time,
    company_id,
    lunch_time
  }: ICreateScheduleDTO): Promise<Schedule> {
    const schedule = await prisma.schedule.create({
      data: {
        id,
        day_of_week,
        opening_time,
        closing_time,
        lunch_time,
        company_id,
      }
    });

    return schedule;
  }

  public async findSchedulesByCompany(company_id: string): Promise<Schedule[]> {
    const schedulesByCompany = await prisma.schedule.findMany({
      where: { company_id },
    });

    return schedulesByCompany;
  }

  public async findById(id: string): Promise<Schedule> {
    const scheduleById = await prisma.schedule.findUnique({
      where: { id },
    });

    return scheduleById;
  }

  public async update(data: ICreateScheduleDTO): Promise<Schedule> {
    const updateSchedule = await prisma.schedule.update({
      where: { id: data.id },
      data: { ...data },
    });

    return updateSchedule;
  }

  public async deleteUniqueSchedule(id: string): Promise<void> {
    await prisma.schedule.delete({
      where: { id },
    });
  }

  public async deleteAllSchedules(company_id: string): Promise<void> {
    await prisma.schedule.deleteMany({
      where: { company_id },
    });
  }

}