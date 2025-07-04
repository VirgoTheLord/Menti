const RoomManager = require("../state");
const calculate = require("../data/calculate");

function handleScores(socket, payload) {
  const { isCorrect, timeLeft, code, name } = payload;
  const room = RoomManager.AllRooms().get(code);
  try {
    if (room.allusers().includes(name)) {
      if (isCorrect) {
        const score = calculate(timeLeft);
        const success = room.updateScore(name, socket, score);
        if (success) {
          socket.send(
            JSON.stringify({
              type: "set-scores-success",
              score: score,
            })
          );
        } else {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Score could not be updated.",
            })
          );
        }
      } else {
        socket.send(
          JSON.stringify({
            type: "set-scores-success",
            message: "Answer is Wrong, no change in score.",
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleScores;
