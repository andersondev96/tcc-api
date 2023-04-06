import { inject, injectable } from "tsyringe";
import { Connection } from "websocket/infra/prisma/entities/Connection";
import { IConnectionsRepository } from "websocket/repositories/IConnectionsRepository";

@injectable()
class GetAllConnectionsService {
  constructor(
    @inject("ConnectionsRepository")
    private connectionRepository: IConnectionsRepository
  ) { }
  async execute(): Promise<Connection[]> {
    const connections = await this.connectionRepository.listAll();

    return connections;
  }
}

export { GetAllConnectionsService };
