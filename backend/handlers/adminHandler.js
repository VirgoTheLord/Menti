const RoomManager = require("../state");

function handleAdmin(socket, payload) {
  const { action, code } = payload;

  const room = RoomManager.AllRooms().get(code);
  if (!room) {
    socket.send(
      JSON.stringify({ type: "error", message: "Room does not exist" })
    );
    return;
  }

  if (!room.isAdmin(socket)) {
    socket.send(
      JSON.stringify({ type: "error", message: "Unauthorized action" })
    );
    return;
  }
  if (room.allusers().length === 0) {
    socket.send(
      JSON.stringify({
        type: "error",
        message: "no users in the room to start the quiz",
      })
    );
  }
  switch (action) {
    case "start-quiz":
      room.broadcast({ type: "quiz-started" });
      console.log(`Quiz started in room ${code}`);
      break;
    case "next-question":
      room.broadcast({ type: "next-question" });
      console.log(`Admin started next question in room ${code}`);
      break;
    case "end-quiz":
      room.broadcast({ type: "quiz-ended" });
      console.log(`Quiz ended in room ${code}`);
      break;
    default:
      socket.send(JSON.stringify({ type: "error", message: "Invalid action" }));
  }
}

module.exports = handleAdmin;
