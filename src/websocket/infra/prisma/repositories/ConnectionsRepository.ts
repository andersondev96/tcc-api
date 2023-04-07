import { ICreateConnectionDTO } from "websocket/dtos/ICreateConnectionDTO";
import { IConnectionsRepository } from "websocket/repositories/IConnectionsRepository";

import { prisma } from "@database/prisma";

import { Connection } from "../entities/Connection";

export class ConnectionsRepository implements IConnectionsRepository {

  public async create({
    id,
    user_id,
    socket_id
  }: ICreateConnectionDTO): Promise<Connection> {
    const connection = await prisma.connection_Socket.create({
      data: {
        id,
        user_id,
        socket_id
      },
      include: {
        user: true
      }
    });

    return connection;
  }

  public async findById(id: string): Promise<Connection> {
    const connection = await prisma.connection_Socket.findUnique({
      where: {
        id
      },
      include: {
        user: true
      }
    });

    return connection;
  }

  public async findByUser(user_id: string): Promise<Connection> {
    const connection = await prisma.connection_Socket.findUnique({
      where: {
        user_id
      },
      include: {
        user: true
      }
    });

    return connection;
  }

  public async findBySocket(socket_id: string): Promise<Connection> {
    const connection = await prisma.connection_Socket.findUnique({
      where: {
        socket_id
      },
      include: {
        user: true
      }
    });

    return connection;
  }

  public async listAll(): Promise<Connection[]> {
    const connections = await prisma.connection_Socket.findMany({
      include: {
        user: true
      }
    });

    return connections;
  }

  public async update(data: ICreateConnectionDTO): Promise<Connection> {
    const connections = await prisma.connection_Socket.update({
      where: {
        id: data.id
      },
      data,
      include: {
        user: true
      }
    });

    return connections;
  }

  public async delete(id: string): Promise<void> {
    await prisma.connection_Socket.delete({
      where: { id }
    });
  }

}