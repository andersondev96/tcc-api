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

    const returnConnections = connections.map((connection) => {
      return {
        ...connection,
        user: {
          ...connection.user,
          avatar: connection.user.avatar
            ? `${process.env.APP_API_URL}/avatar/${connection.user.avatar}`
            : undefined
        }
      }
    })

    return returnConnections;
  }
}

export { GetAllConnectionsService };
