//first room is created then validation has to happen yes
const RoomManager = require("../state");

function handleValidate(socket, payload) {
  const { name, code } = payload;
  const regex = /^[0-9]{4}-[0-9]{4}$/;
  const isValid = regex.test(code);

  if (!RoomManager.AllRooms().has(code) || !isValid) {
    console.log("Room does not exist or invalid format XXXX-XXXX");
  } else {
    const room = RoomManager.getRoom(code);
    const success = room.add(name, socket);
    if (!success) {
      socket.send(
        JSON.stringify({
          type: "error",
          message: "USER already exists in room",
        })
      );
    } else {
      room.broadcast({ type: "user-joined", name: name });
    }
  }
}

module.exports = handleValidate;
