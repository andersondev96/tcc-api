import { container } from "tsyringe";

import { io } from "@shared/infra/http/app";

import { CreateConnectionService } from "./services/CreateConnectionService";

io.on("connect", socket => {


  socket.on("start", async (data) => {
    const { email, telephone } = data;
    const createConnectionService = container.resolve(CreateConnectionService);

    const connection = await createConnectionService.execute({
      email,
      telephone,
      socket_id: socket.id
    });

    console.log(connection);
  });
});