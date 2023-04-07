import { inject, injectable } from "tsyringe";
import { Connection } from "websocket/infra/prisma/entities/Connection";
import { IConnectionsRepository } from "websocket/repositories/IConnectionsRepository";

@injectable()
export class GetConnectionBySocketService {

  constructor(
    @inject("ConnectionsRepository")
    private connectionRepository: IConnectionsRepository
  ) { }

  public async execute(socket_id: string): Promise<Connection> {
    const connection = await this.connectionRepository.findBySocket(
      socket_id
    );

    return connection;
  }
}