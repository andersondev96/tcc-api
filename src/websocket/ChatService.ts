import { container } from "tsyringe";

import { io } from "@shared/infra/http/app";

import { CreateConnectionService } from "./services/CreateConnectionService";
import { GetAllConnectionsService } from "./services/GetAllConnectionsService";

io.on("connect", socket => {


  socket.on("start", async (data) => {
    const { email, telephone } = data;
    const createConnectionService = container.resolve(CreateConnectionService);

    const connection = await createConnectionService.execute({
      email,
      telephone,
      socket_id: socket.id
    });

    socket.broadcast.emit("new_connection", connection);
  });

  socket.on("get_connections", async (callback) => {
    const getAllConnectionsService = container.resolve(
      GetAllConnectionsService
    );
    const connections = await getAllConnectionsService.execute();

    callback(connections);
  });
});