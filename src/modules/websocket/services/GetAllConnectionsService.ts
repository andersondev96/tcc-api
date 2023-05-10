import { Connection } from "@modules/websocket/infra/prisma/entities/Connection";
import { IConnectionsRepository } from "@modules/websocket/repositories/IConnectionsRepository";
import { getUserAvatarUrl } from "@shared/utils/getFilesUrl";
import { inject, injectable } from "tsyringe";

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
          avatar: getUserAvatarUrl(connection.user, "avatar")
        }
      }
    })

    return returnConnections;
  }
}

export { GetAllConnectionsService };
