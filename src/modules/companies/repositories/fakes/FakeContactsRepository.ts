import { v4 as uuid } from "uuid";

import { ICreateContactDTO } from "@modules/companies/dtos/ICreateContactDTO";
import { Contact } from "@modules/companies/infra/prisma/entities/Contact";
import { IContactsRepository } from "../IContactsRepository";

export class FakeContactsRepository implements IContactsRepository {

    contacts: Contact[] = [];

    public async create(data: ICreateContactDTO): Promise<Contact> {
        Object.assign(data, {
            id: uuid(),
        });

        this.contacts.push(data);

        return data;
    }

    public async findById(id: string): Promise<Contact> {
        const findContactById = this.contacts.find((contact) => contact.id === id);

        return findContactById;
    }

    public async update(data: ICreateContactDTO): Promise<Contact> {
        const index = this.contacts.findIndex(findUser => findUser.id === data.id);

        this.contacts[index] = data;

        return data;
    }

    public async delete(id: string): Promise<void> {
        const index = this.contacts.findIndex(
            contact => contact.id === id
        );

        this.contacts.splice(index, 1);
    }

}