import { prisma } from "@database/prisma";
import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";

import { Customer } from "../entities/Customer";

export class CustomersRepository implements ICustomersRepository {

  public async create({
    id,
    user_id,
    status,
    telephone
  }: ICreateCustomerDTO): Promise<Customer> {
    const customer = await prisma.customer.create({
      data: {
        id,
        user_id,
        status,
        telephone
      }
    });

    return customer;
  }

  public async findCustomerByName(name: string): Promise<Customer[]> {
    const customer = await prisma.customer.findMany({
      where: {
        user: {
          name
        }
      }
    });

    return customer;
  }

  public async deleteCustomer(customer_id: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        id: customer_id
      }
    });
  }

}