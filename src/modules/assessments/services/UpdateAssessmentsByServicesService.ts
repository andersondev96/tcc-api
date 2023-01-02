import { inject, injectable } from "tsyringe";

import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

interface IRequest {
  assessment_id: string;
  comment: string;
  stars?: number;
}

@injectable()
export class UpdateAssessmentsByServicesService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository
  ) { }

  public async execute({ assessment_id, comment, stars }: IRequest): Promise<Assessment> {

    const findAssessment = await this.assessmentRepository.findAssessmentById(assessment_id);

    if (!findAssessment) {
      throw new AppError("Assessment not found");
    }

    const service = await this.serviceRepository.findServiceById(findAssessment.table_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    const assessment = await this.assessmentRepository.updateAssessments({
      id: assessment_id,
      user_id: findAssessment.user_id,
      table_id: findAssessment.table_id,
      comment,
      stars
    });

    const servicesAssessments = await this.assessmentRepository.findAssessments(findAssessment.table_id);
    const totStars = servicesAssessments.reduce((sum, current) => sum + current.stars, 0);


    service.stars = Math.trunc((totStars / (servicesAssessments.length)));

    await this.serviceRepository.updateStars(service.id, service.stars);

    return assessment;

  }
}