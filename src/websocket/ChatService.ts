import { io } from "@shared/infra/http/app";

io.on("connect", socket => {

  socket.emit("chat_iniciado", {
    message: "Seu chat foi iniciado"
  });
});