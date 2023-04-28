import { ICreateConnectionDTO } from "websocket/dtos/ICreateConnectionDTO";

import { Connection } from "../infra/prisma/entities/Connection";

export interface IConnectionsRepository {
  create(data: ICreateConnectionDTO): Promise<Connection>;

  findById(id: string): Promise<Connection>;

  findByUser(user_id: string): Promise<Connection>;

  findBySocket(socket_id: string): Promise<Connection>;

  listAllWithChat(loggedConnectionId: string): Promise<Connection[]>;

  update(data: ICreateConnectionDTO): Promise<Connection>;

  delete(id: string): Promise<void>;
}