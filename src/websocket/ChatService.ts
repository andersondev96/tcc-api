import { container } from "tsyringe";

import { io } from "@shared/infra/http/app";

import { CreateChatRoomService } from "./services/CreateChatRoomService";
import { CreateChatService } from "./services/CreateChatService";
import { CreateConnectionService } from "./services/CreateConnectionService";
import { GetAllConnectionsService } from "./services/GetAllConnectionsService";
import { GetChatRoomByConnectionsService } from "./services/GetChatRoomByConnectionsService";
import { GetConnectionBySocketService } from "./services/GetConnectionBySocketService";
import { GetMessagesByChatRoomService } from "./services/GetMessagesByChatRoomServices";

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

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getChatRoomByConnectionService = container.resolve(GetChatRoomByConnectionsService);
    const getConnectionBySocketIdService = container.resolve(GetConnectionBySocketService);
    const getMessagesByChatRoomService = container.resolve(GetMessagesByChatRoomService);

    const userConnectionLogged = await getConnectionBySocketIdService.execute(socket.id);

    let room = await getChatRoomByConnectionService.execute([
      data.idUser,
      userConnectionLogged.id
    ]);

    if (!room) {
      room = await createChatRoomService.execute([
        data.idUser,
        userConnectionLogged.id
      ]);
    }

    socket.join(room.id);

    const messages = await getMessagesByChatRoomService.execute(
      room.id
    );

    console.log(messages);

    callback({ room, messages });

  });

  socket.on("message", async (data) => {
    const getConnectionBySocketService = container.resolve(GetConnectionBySocketService);
    const createChatService = container.resolve(CreateChatService);

    const connection = await getConnectionBySocketService.execute(socket.id);

    const chat = await createChatService.execute({
      name: connection.user.name,
      text: data.message,
      chatroom_id: data.idChatRoom,
      connection_id: connection.id
    });

    io.to(data.idChatRoom).emit("message", {
      chat,
      connection
    });


  });
});