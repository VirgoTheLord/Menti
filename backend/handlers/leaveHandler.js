const RoomManager = require("../state");

function handleLeave(socket, payload) {
  const { name, code } = payload;

  const room = RoomManager.AllRooms().get(code);
  try {
    if (room.delete(name)) {
      console.log(`User ${name} has left the room`);

      room.broadcast({ type: "leave", message: "the user has left the room" });
    } else {
      console.log(`User ${name} not found in room ${code}`);
      socket.send(
        JSON.stringify({
          type: "error",
          message: `User ${name} not found in room ${code}`,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleLeave;
