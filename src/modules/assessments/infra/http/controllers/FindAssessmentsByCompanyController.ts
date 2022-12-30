import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAssessmentsByCompanyService } from "@modules/assessments/services/FindAssessmentsByCompanyService";

export class FindAssessmentsByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const findAssessmentsByCompanyService = container.resolve(FindAssessmentsByCompanyService);

    const assessments = await findAssessmentsByCompanyService.execute(company_id);

    return response.status(201).json(assessments);
  }
}