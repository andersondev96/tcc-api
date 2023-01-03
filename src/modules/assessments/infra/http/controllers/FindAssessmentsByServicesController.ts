import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindAssessmentsByServicesService } from "@modules/assessments/services/FindAssessmentsByServicesService";

export class FindAssessmentsByServicesController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { service_id } = request.params;

    const findAssessmentsByServicesService = container.resolve(FindAssessmentsByServicesService);

    const assessments = await findAssessmentsByServicesService.execute(service_id);

    return response.status(201).json(assessments);
  }
}