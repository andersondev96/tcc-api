import { ICreateConnectionDTO } from "websocket/dtos/ICreateConnectionDTO";

import { Connection } from "../infra/prisma/entities/Connection";

export interface IConnectionsRepository {
  create(data: ICreateConnectionDTO): Promise<Connection>;

  findById(id: string): Promise<Connection>;

  listAll(): Promise<Connection[]>;

  delete(id: string): Promise<void>;
}