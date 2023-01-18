import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { Customer } from "../infra/prisma/entities/Customer";

export interface ICustomersRepository {

  create(data: ICreateCustomerDTO): Promise<Customer>;

  findCustomerById(id: string): Promise<Customer>;

  findCustomerByName(name: string): Promise<Customer[]>;

  findCustomerByUser(user_id: string): Promise<Customer>;

  findCustomerByCompany(company_id: string): Promise<Customer[]>;

  deleteCustomer(customer_id: string): Promise<void>;
} 