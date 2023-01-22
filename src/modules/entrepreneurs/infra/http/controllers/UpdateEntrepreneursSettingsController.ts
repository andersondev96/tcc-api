import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateEntrepreneursSettingsService } from "@modules/entrepreneurs/services/UpdateEntrepreneursSettingsService";

export class UpdateEntrepreneursSettingsController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { entrepreneur_id } = request.params;

    const {
      service_name_color,
      service_price_color,
      card_color,
      highlight_services_quantity,
      online_budget,
      online_chat,
      email_notification } = request.body;

    const updateEntrepreneursSettingsService = container.resolve(UpdateEntrepreneursSettingsService);

    const entrepreneursSettingsService = await updateEntrepreneursSettingsService.execute({
      entrepreneur_id,
      service_name_color,
      service_price_color,
      card_color,
      highlight_services_quantity,
      online_budget,
      online_chat,
      email_notification
    });

    return response.status(201).json(entrepreneursSettingsService);

  }
}