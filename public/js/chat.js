const socket = io("http://localhost:3333");

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");
  const telephone = urlParams.get("telephone");


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
    console.log("getConnections", connections);

    connections.map((connection) => {
      if (connection.user.email !== email) {
        addConnection(connection);
      }
    });
  });
}

function addConnection(connection) {
  console.log("addConnection");
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

onLoad();