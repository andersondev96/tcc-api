import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateAssessmentsCompanyService } from "@modules/assessments/services/CreateAssessmentsCompanyService";

export class CreateAssessmentsCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { company_id } = request.params;
    const { comment } = request.body;

    const createAssessmentsCompanyService = container.resolve(CreateAssessmentsCompanyService);

    const assessment = await createAssessmentsCompanyService.execute({
      user_id: id,
      company_id,
      comment
    });

    return response.status(201).json(assessment);
  }
}