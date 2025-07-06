//first room is created then validation has to happen yes
const RoomManager = require("../state");

function handleValidate(socket, payload) {
  const { name, code, isAdmin } = payload;
  const regex = /^[0-9]{4}-[0-9]{4}$/;
  const isValid = regex.test(code);

  if (!RoomManager.AllRooms().has(code) || !isValid) {
    console.log("Room does not exist or invalid format XXXX-XXXX");
    socket.send(
      JSON.stringify({
        type: "error",
        message: "Room does not exist or invalid format XXXX-XXXX",
      })
    );
  } else {
    const room = RoomManager.getRoom(code);
    if (isAdmin) {
      room.setAdmin(socket);
      console.log(`Admin has joined the room ${code}`);
      // socket.send(
      //   JSON.stringify({
      //     type: "Admin Joined",
      //     message: "Admin has joined the room",
      //   })
      // );
      room.add(name, socket);
      room.broadcast({
        type: "Admin Joined",
        message: `Admin has joined room ${code}`,
      });
      socket.send(JSON.stringify({ type: "validation-success" }));
      room.broadcast({
        type: "players-update",
        players: room.allusers(),
      });
    } else {
      const success = room.add(name, socket);
      if (!success) {
        socket.send(
          JSON.stringify({
            type: "error",
            message: "USER already exists in room",
          })
        );
      } else {
        socket.send(JSON.stringify({ type: "validation-success" }));
        room.broadcast({ type: "user-joined", name: name });
        console.log(`User ${name} has joined the room ${code}`);
        room.broadcast({ type: "players-update", players: room.allusers() });
      }
    }
  }
}

module.exports = handleValidate;
