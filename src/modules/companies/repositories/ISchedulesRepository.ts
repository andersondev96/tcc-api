import { ICreateScheduleDTO } from "../dtos/ICreateScheduleDTO";
import { Schedule } from "../infra/prisma/entities/Schedule";

export interface ISchedulesRepository {

  create(data: ICreateScheduleDTO): Promise<Schedule>;

  findSchedulesByCompany(company_id: string): Promise<Schedule[]>;

  findById(id: string): Promise<Schedule>;

  update(data: ICreateScheduleDTO): Promise<Schedule>;

  delete(id: string): Promise<void>;
}