import { useWebSocket } from "../context/WebSocketContext";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const UserQuiz = () => {
  const {
    isConnected,
    players,
    room,
    quizStart,
    name,
    sendMessage,
    setRoom,
    nextQuestion,
  } = useWebSocket();
  const roomNumber = useLocation().pathname.split("/").pop();
  useEffect(() => {
    setRoom(roomNumber);
  }, [roomNumber]);

  const [selectedOption, setSelectedOption] = useState("");
  const handleSubmitAnswer = () => {
    if (selectedOption) {
      sendMessage({
        type: "submit-answer",
        payload: {
          qid: nextQuestion.qid,
          answer: selectedOption,
          code: roomNumber,
          name: name,
        },
      });
    }
  };

  if (!isConnected) {
    console.log("User not connected");
    return <p>Connecting......</p>;
  }

  return (
    <div>
      {!quizStart ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <>
            <h1 className="text-3xl font-bold mb-4">User Quiz</h1>
            <p className="text-lg">Loading quiz...</p>
            <div className="mt-4">
              <p className="text-lg">Room Code: {room ? room : roomNumber}</p>
              <p>Players in room:{players.length}</p>
              {players.map((player, id) => {
                return (
                  <p key={id} className="text-lg">
                    {player}
                  </p>
                );
              })}
            </div>
          </>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          {nextQuestion && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{nextQuestion.question}</h2>
              <form className="flex flex-col gap-4">
                {Object.entries(nextQuestion.options).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-2 text-lg"
                  >
                    <input
                      type="radio"
                      name="option"
                      value={key}
                      checked={selectedOption === key}
                      onChange={() => setSelectedOption(key)}
                      className="form-radio text-blue-600"
                    />
                    <span>
                      {key}: {value}
                    </span>
                  </label>
                ))}
              </form>
              <button
                onClick={handleSubmitAnswer}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8">
        <p className="text-lg">Quiz Ended!</p>
        <p className="text-md">Your score: 10/10</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Exit
        </button>
      </div>
    </div>
  );
};

export default UserQuiz;
