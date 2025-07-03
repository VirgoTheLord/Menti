const questions = require("../data/questions");
const RoomManager = require("../state");

function handleSubmit(socket, payload) {
  const { qid, name, code, answer } = payload;
  const question = questions.find((s) => s.qid === qid);
  const room = RoomManager.AllRooms(code);

  try {
    if (room.allusers().includes(name)) {
      if (!question) {
        console.log("Quetion not found");
      }
      const isCorrect = answer === question.answer;
      if (isCorrect) {
        socket.send(
          JSON.stringify({
            type: "submit-answer-response",
            message: "Answer is correct",
            isCorrect,
            answer: "Correct",
          })
        );
      } else {
        socket.send(
          JSON.stringify({
            type: "submit-answer-response",
            message: "Answer is Wrong",
            isCorrect,
            answer: "Wrong",
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = handleSubmit;
