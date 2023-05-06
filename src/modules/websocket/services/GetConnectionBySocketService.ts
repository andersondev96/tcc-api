import { Connection } from "@modules/websocket/infra/prisma/entities/Connection";
import { IConnectionsRepository } from "@modules/websocket/repositories/IConnectionsRepository";
import { inject, injectable } from "tsyringe";

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