import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAssessmentsByCompanyService } from "@modules/assessments/services/UpdateAssessmentsByCompanyService";

export class UpdateAssessmentsByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { assessment_id } = request.params;

    const { comment, stars } = request.body;

    const updateAssessmentsByCompanyService = container.resolve(UpdateAssessmentsByCompanyService);

    const assessment = await updateAssessmentsByCompanyService.execute({
      assessment_id,
      comment,
      stars
    });

    return response.status(201).json(assessment);

  }
}