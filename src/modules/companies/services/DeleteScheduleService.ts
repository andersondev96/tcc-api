import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { SchedulesRepository } from "../infra/prisma/repositories/SchedulesRepository";

@injectable()
export class DeleteScheduleService {

    constructor(
        @inject("SchedulesRepository")
        private scheduleRepository: SchedulesRepository
    ) { }

    public async execute(schedule_id: string): Promise<void> {

        const schedule = await this.scheduleRepository.findById(schedule_id);

        if (!schedule) {
            throw new AppError("Schedule not found");
        }

        await this.scheduleRepository.deleteUniqueSchedule(schedule_id);
    }
}