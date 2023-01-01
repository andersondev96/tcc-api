import { inject, injectable } from "tsyringe";

import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

interface IRequest {
  user_id: string;
  service_id: string;
  comment: string;
  stars?: number;
}

@injectable()
export class CreateAssessmentsServicesService {
  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ user_id, service_id, comment, stars }: IRequest): Promise<Assessment> {
    const user = await this.usersRepository.findById(user_id);

    if (user) {
      const service = await this.serviceRepository.findServiceById(service_id);

      if (!service) {
        throw new AppError("Service not found");
      }

      const assessment = await this.assessmentRepository.create({
        user_id,
        table_id: service_id,
        comment,
        stars
      });

      const servicesAssessment = await this.assessmentRepository.findAssessments(service.id);

      const totStars = servicesAssessment.reduce((sum, current) => sum + current.stars, 0);

      service.stars = Math.trunc((totStars / (servicesAssessment.length)));

      await this.serviceRepository.updateStars(service.id, service.stars);

      return assessment;
    }
  }
}