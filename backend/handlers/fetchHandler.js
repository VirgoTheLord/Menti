const RoomManager = require("../state");
const questions = require("../data/questions");

function handleFetch(socket, payload) {
  const { qid, name, code } = payload;
  const question = questions.find((s) => s.qid === qid);
  const room = RoomManager.AllRooms().get(code);

  if (!question) {
    console.log("question not found");
  } else {
    if (room.allusers().includes(name)) {
      console.log("question found");

      socket.send(
        JSON.stringify({ type: "fetch-question-success", question: question })
      );
    } else {
      console.log("user not in room");
    }
  }
}
module.exports = handleFetch;
