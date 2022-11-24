import { DeleteServiceService } from "@modules/services/services/DeleteServiceService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteServiceController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { service_id } = request.params;

        const deleteServiceService = container.resolve(DeleteServiceService);

        await deleteServiceService.execute(service_id);

        return response.send().status(200);
    }
}