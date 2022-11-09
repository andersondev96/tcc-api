import { prisma } from "@database/prisma";
import { ICreateContactDTO } from "@modules/companies/dtos/ICreateContactDTO";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { Contact } from "../entities/Contact";

export class ContactsRepository implements IContactsRepository {

    public async create({
        telephone,
        email,
        whatsapp,
        website,
        id,
        company_id
    }: ICreateContactDTO): Promise<Contact> {
        const contact = await prisma.contact.create({
            data: {
                id,
                telephone,
                email,
                whatsapp,
                website,
                company_id
            },
        });

        return contact;
    }

    public async findById(id: string): Promise<Contact> {
        const findByContact = await prisma.contact.findUnique({
            where: {
                id
            },
        });

        return findByContact;
    }

    public async update(data: ICreateContactDTO): Promise<Contact> {
        const updateContact = await prisma.contact.update({
            where: { id: data.id },
            data: { ...data },
        });

        return updateContact;
    }

    public async delete(id: string): Promise<void> {
        await prisma.contact.delete({
            where: { id }
        });
    }

}