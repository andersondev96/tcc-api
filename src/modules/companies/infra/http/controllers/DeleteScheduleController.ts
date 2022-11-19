import { DeleteScheduleService } from "@modules/companies/services/DeleteScheduleService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteScheduleController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;

        const deleteScheduleService = container.resolve(DeleteScheduleService);

        await deleteScheduleService.execute(id);

        return response.send().status(200);
    }
}