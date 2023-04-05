const socket = io("http://localhost:3333");

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const telephone = urlParams.get("telephone");

  console.log(telephone);

  socket.emit("start", {
    telephone,
    email
  });
}

onLoad();