import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Customer } from "../infra/prisma/entities/Customer";
import { ICustomersRepository } from "../repositories/ICustomersRepository";

@injectable()
export class ShowCustomerByUserService {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository
  ) { }

  public async execute(user_id: string): Promise<Customer> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const customer = await this.customerRepository.findCustomerByUser(user_id);

    if (!customer) {
      throw new AppError("User don't have a customer");
    }

    return customer;
  }
}