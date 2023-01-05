import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { Customer } from "../infra/prisma/entities/Customer";

export interface ICustomersRepository {

  create(data: ICreateCustomerDTO): Promise<Customer>;

  findCustomerByName(name: string): Promise<Customer[]>;

  deleteCustomer(customer_id: string): Promise<void>;
} 