import { inject, injectable } from "tsyringe";

import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { getUserAvatarUrl } from "@shared/utils/getFilesUrl";
import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

@injectable()
export class FindAssessmentsByServicesService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) { }

  public async execute(service_id: string): Promise<Assessment[]> {

    const service = await this.serviceRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    let assessmentsUserAvatar = await this.cacheProvider.recover<Assessment[]>(`assessments-service:${service_id}`);

    if (!assessmentsUserAvatar) {

      const assessments = await this.assessmentRepository.findAssessments(service_id);

      assessmentsUserAvatar = assessments.map((assessment) => {
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

      await this.cacheProvider.save(`assessments-service:${service_id}`, assessmentsUserAvatar);

      console.log("Adicionou ao cache");
    }

    return assessmentsUserAvatar;
  }
}