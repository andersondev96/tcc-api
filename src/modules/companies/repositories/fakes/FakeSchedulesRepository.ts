import { v4 as uuid } from "uuid";

import { ICreateScheduleDTO } from "@modules/companies/dtos/ICreateScheduleDTO";
import { Schedule } from "@modules/companies/infra/prisma/entities/Schedule";

import { ISchedulesRepository } from "../ISchedulesRepository";

export class FakeSchedulesRepository implements ISchedulesRepository {

  schedules: Schedule[] = [];

  public async create(data: ICreateScheduleDTO): Promise<Schedule> {
    Object.assign(data, {
      id: uuid(),
    });

    this.schedules.push(data);

    return data;
  }

  public async findSchedulesByCompany(company_id: string): Promise<Schedule[]> {
    const findByCompany = this.schedules.filter((schedule) => schedule.company_id === company_id);

    return findByCompany;
  }

  public async findById(id: string): Promise<Schedule> {
    const findScheduleById = this.schedules.find((schedule) => schedule.id === id);

    return findScheduleById;
  }

  public async update(data: ICreateScheduleDTO): Promise<Schedule> {
    const index = this.schedules.findIndex(findSchedule => findSchedule.id === data.id);

    this.schedules[index] = data;

    return data;
  }

  public async deleteUniqueSchedule(id: string): Promise<void> {
    const index = this.schedules.findIndex(schedule => schedule.id === id);

    this.schedules.splice(index, 1);
  }

  public async deleteAllSchedules(company_id: string): Promise<void> {
    const index = this.schedules.findIndex(schedule => schedule.company_id === company_id);

    while (index >= 0) {
      this.schedules.splice(index, 1);
    }
  }

}