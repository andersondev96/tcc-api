const socket = io("http://localhost:3333");

socket.on("chat_iniciado", data => {
  console.log(data);
});
