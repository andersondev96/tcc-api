import { v4 as uuid } from "uuid";

import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { Customer } from "@modules/customers/infra/prisma/entities/Customer";
import { User } from "@modules/users/infra/prisma/entities/User";

import { ICustomersRepository } from "../ICustomersRepository";

export class FakeCustomersRepository implements ICustomersRepository {
  customers: Customer[] = [];
  users: User[] = [];

  public async create(data: ICreateCustomerDTO): Promise<Customer> {
    Object.assign(data, {
      id: uuid()
    });

    this.customers.push(data);

    return data;
  }

  public async findCustomerByName(name: string): Promise<Customer[]> {
    const user = this.users.find(user => user.name === name);

    const customer = this.customers.filter(customer => customer.user_id === user.name);

    return customer;
  }

  public async deleteCustomer(customer_id: string): Promise<void> {
    const index = this.customers.findIndex(customer => customer.id === customer_id);

    this.customers.splice(index, 1);
  }

}