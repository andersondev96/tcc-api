import { Connection } from "@modules/websocket/infra/prisma/entities/Connection";
import { IConnectionsRepository } from "@modules/websocket/repositories/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string,
  telephone: string,
  socket_id: string;
}
@injectable()
export class CreateConnectionService {

  constructor(
    @inject("ConnectionsRepository")
    private connectionRepository: IConnectionsRepository,
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository
  ) { }

  public async execute({ email, telephone, socket_id }: IRequest): Promise<Connection> {

    console.log(email);

    const user = await this.userRepository.findByMail(email);

    if (!user) {
      throw new AppError("User not found");
    }

    const customer = await this.customerRepository.findCustomerByUser(user.id);

    if (!customer) {
      await this.customerRepository.create({
        user_id: user.id,
        telephone
      });
    }

    const connectionAlreadyExists = await this.connectionRepository.findByUser(user.id);

    if (connectionAlreadyExists) {
      const connection = await this.connectionRepository.update({
        id: connectionAlreadyExists.id,
        user_id: user.id,
        socket_id
      });

      return connection;
    }

    const connection = await this.connectionRepository.create({
      user_id: user.id,
      socket_id
    });

    return connection;
  }
}