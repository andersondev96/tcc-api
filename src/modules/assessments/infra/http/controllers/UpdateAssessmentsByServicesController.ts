import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAssessmentsByServicesService } from "@modules/assessments/services/UpdateAssessmentsByServicesService";

export class UpdateAssessmentsByServicesController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { assessment_id } = request.params;

    const { comment, stars } = request.body;

    const updateAssessmentsByServicesService = container.resolve(UpdateAssessmentsByServicesService);

    const assessment = await updateAssessmentsByServicesService.execute({
      assessment_id,
      comment,
      stars
    });

    return response.status(201).json(assessment);
  }
}