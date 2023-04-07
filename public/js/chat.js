const socket = io("http://localhost:3333");
let roomId = "";

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const email = urlParams.get("email");
  const telephone = urlParams.get("telephone");

  document.querySelector(".user_logged").innerHTML += `
    <img
      class="avatar_user_logged"
      src="https://avatars.githubusercontent.com/u/20424197?v=4"
    />
    <strong id="user_logged">${name}</strong>
  `;


  socket.emit("start", {
    telephone,
    email
  });

  socket.on("new_connection", (connection) => {
    const existInDiv = document.getElementById(`user_${connection.id}`);

    if (!existInDiv) {
      addConnection(connection);
    }
  });

  socket.emit("get_connections", (connections) => {

    connections.map((connection) => {
      if (connection.user.email !== email) {
        addConnection(connection);
      }
    });
  });
}

function addConnection(connection) {
  const usersList = document.getElementById("users_list");
  usersList.innerHTML += `
    <li
      class="user_name_list"
      id="user_${connection.id}"
      idUser="${connection.id}"
    >
      <img
        class="nav_avatar"
        src="https://avatars.githubusercontent.com/u/20424197?v=4"
      />
      ${connection.user.name}
  </li>
  `;
}

document.getElementById("users_list").addEventListener("click", (event) => {

  if (event.target && event.target.matches("li.user_name_list")) {
    const idUser = event.target.getAttribute("idUser");
    console.log("idUser", idUser);

    socket.emit("start_chat", { idUser }, (data) => {
      console.log(data);
      roomId = data.id;
    });
  }
});

onLoad();