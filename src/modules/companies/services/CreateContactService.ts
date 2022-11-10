import { inject, injectable } from "tsyringe";
import { Contact } from "../infra/prisma/entities/Contact";
import { IContactsRepository } from "../repositories/IContactsRepository";

interface IRequest {
    telephone: string;
    whatsapp: string;
    email: string;
    website: string
}

@injectable()
export class CreateContactService {

    constructor(
        @inject("ContactsRepository")
        private contactRepository: IContactsRepository,
    ) { }

    public async execute({
        telephone,
        whatsapp,
        email,
        website
    }: IRequest): Promise<Contact> {

        const contact = await this.contactRepository.create({
            telephone,
            whatsapp,
            email,
            website
        });

        return contact;
    }
}