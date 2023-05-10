import { inject, injectable } from "tsyringe";

import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { getUserAvatarUrl } from "@shared/utils/getFilesUrl";
import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

@injectable()
export class FindAssessmentsByServicesService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository
  ) { }

  public async execute(service_id: string): Promise<Assessment[]> {

    const service = await this.serviceRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    const assessments = await this.assessmentRepository.findAssessments(service_id);

    const assessmentsUserAvatar = assessments.map((assessment) => {
      if (!assessment.user) {
        return assessment;
      }

      const userWithAvatar = {
        ...assessment.user,
        avatar: getUserAvatarUrl(assessment.user, "avatar")
      }

      return {
        ...assessment,
        user: userWithAvatar
      }
    });

    return assessmentsUserAvatar;
  }
}