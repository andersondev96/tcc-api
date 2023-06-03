import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowSettingEntrepreneurCompanyService } from "@modules/entrepreneurs/services/ShowSettingEntrepreneurCompanyService";

export class ShowSettingEntrepreneurCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const showSettingEntrepreneurCompanyService = container.resolve(
      ShowSettingEntrepreneurCompanyService
    );

    const settings = await showSettingEntrepreneurCompanyService.execute(company_id);

    return response.status(200).json(settings);
  }
}