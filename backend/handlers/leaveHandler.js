const RoomManager = require("../state");

function handleLeave(socket, payload) {
  const { name, code } = payload;

  const room = RoomManager.AllRooms().get(code);
  try {
    if (room.delete(name)) {
      console.log(`User ${name} has left the room`);

      room.broadcast({
        type: "leave",
        message: "the user has left the room",
        players: room.allusers(),
      });
    } else {
      console.log(`User ${name} not found in room ${code}`);
      socket.send(
        JSON.stringify({
          type: "error",
          message: `User ${name} not found in room ${code}`,
        })
      );
    }
    //i can also just keep a boolean check to see if the socket is an admin using isAdmin()
    const admin = room.isAdmin(socket);
    if (room.allusers().length === 0 || admin) {
      RoomManager.removeRoom(code);
      console.log(
        `Room ${code} has been deleted since there is no one left in the room `
      );

      return;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleLeave;
