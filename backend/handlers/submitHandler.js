const questions = require("../data/questions");
const RoomManager = require("../state");
const calculate = require("../data/calculate");

function handleSubmit(socket, payload) {
  const { qid, name, code, answer, timeLeft } = payload;
  const question = questions.find((s) => s.qid === qid);
  const room = RoomManager.AllRooms().get(code);

  if (!room) {
    console.log("Room does not exist");
    socket.send(
      JSON.stringify({ type: "error", message: "Room does not exist" })
    );
  }

  try {
    if (room.allusers().includes(name)) {
      if (!question) {
        console.log("Question not found");
      }
      const isCorrect = answer === question.answer;
      if (isCorrect) {
        const score = calculate(timeLeft);
        const success = room.updateScore(name, socket, score);
        if (success) {
          socket.send(
            JSON.stringify({
              type: "submit-answer-response",
              message: "Answer is correct",
              name: name,
              isCorrect,
              answer: "Correct",
              score: score,
            })
          );
        }
      } else {
        socket.send(
          JSON.stringify({
            type: "submit-answer-response",
            message: "Answer is Wrong",
            name: name,
            isCorrect,
            answer: "Wrong",
            score: 0,
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleSubmit;
