import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContactService } from "@modules/companies/services/CreateContactService";

export class CreateContactController {

    public async handle(request: Request, response: Response): Promise<Response> {

        const {
            telephone,
            whatsapp,
            email,
            website
        } = request.body;

        const createContactService = container.resolve(CreateContactService);

        const contact = await createContactService.execute({
            telephone,
            whatsapp,
            email,
            website
        });

        return response.status(201).json(contact);
    }
}