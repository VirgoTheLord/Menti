const RoomManager = require("../state");
const questions = require("../data/questions");

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
  if (room.allusers().length === 1) {
    socket.send(
      JSON.stringify({
        type: "error",
        message: "no users in the room to start the quiz",
      })
    );
    return;
  }

  const sendQid = room.qid;
  room.qid += 1;

  const totalLength = questions.length;
  switch (action) {
    case "start-quiz":
      const first = questions.find((s) => s.qid === sendQid);
      if (!first) {
        socket.send(
          JSON.stringify({ type: "error", message: "Question does not exist" })
        );
      }
      room.broadcast({
        type: "quiz-started",
        payload: {
          question: first,
          length: totalLength,
        },
      });
      console.log(
        `Quiz started in room ${code} and ${sendQid} question is sent`
      );
      break;
    case "next-question":
      const question = questions.find((s) => s.qid === sendQid);
      if (!question) {
        socket.send(
          JSON.stringify({ type: "error", message: "Question does not exist" })
        );
      }

      room.broadcast({ type: "next-question", payload: question });
      console.log(`Admin started next question ${sendQid} in room ${code}`);
      break;
    case "end-quiz":
      const leaderboard = room.getLeaderboard();
      room.broadcast({ type: "quiz-ended", leaderboard });
      console.log(
        `Quiz ended in room ${code} and this is the leaderboard sent`
      );
      break;
    default:
      socket.send(JSON.stringify({ type: "error", message: "Invalid action" }));
  }
}

module.exports = handleAdmin;
