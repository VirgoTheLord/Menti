const RoomManager = require("../state");

function handleLeave(socket, payload) {
  const { name, code } = payload;

  const room = RoomManager.AllRooms().get(code);

  if (room.delete(name)) {
    console.log(`User ${name} has left the room`);

    room.broadcast({ type: "leave", message: "the user has left the room" });
  } else {
    console.log(error);
  }
}

module.exports = handleLeave;
