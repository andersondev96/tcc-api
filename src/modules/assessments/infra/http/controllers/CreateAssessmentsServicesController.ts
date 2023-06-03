import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAssessmentsServicesService } from "@modules/assessments/services/CreateAssessmentsServicesService";

export class CreateAssessmentsServicesController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { service_id } = request.params;
    const { comment, stars } = request.body;

    const createAssessmentsServicesService = container.resolve(CreateAssessmentsServicesService);

    const assessments = await createAssessmentsServicesService.execute({
      user_id: id,
      service_id,
      comment,
      stars
    });

    return response.status(201).json(assessments);
  }
}