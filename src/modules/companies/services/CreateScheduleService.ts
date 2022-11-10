import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Schedule } from "../infra/prisma/entities/Schedule";
import { SchedulesRepository } from "../infra/prisma/repositories/SchedulesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

interface IRequest {
    day_of_week: string;
    opening_time: string;
    closing_time: string;
    company_id: string;
}

@injectable()
export class CreateScheduleService {

    constructor(
        @inject("SchedulesRepository")
        private scheduleRepository: SchedulesRepository,

        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

    ) { }

    public async execute({
        day_of_week,
        opening_time,
        closing_time,
        company_id
    }: IRequest): Promise<Schedule> {

        const company = await this.companyRepository.findById(company_id);

        if (!company) {
            throw new AppError("This company does not exist");
        }

        const schedule = await this.scheduleRepository.create({
            day_of_week,
            opening_time,
            closing_time,
            company_id
        });

        return schedule;
    }
}