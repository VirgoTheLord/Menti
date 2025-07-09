import { useWebSocket } from "../context/WebSocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const UserQuiz = () => {
  const {
    handleSubmitAnswer,
    handleLeaveRoom,
    isConnected,
    quizStart,
    players,
    nextQuestion,
    submit,
    isCorrect,
    contextName,
    currentScore,
    showScore,
    room,
    selectedOption,
    setSelectedOption,
    leaderboard,
  } = useUser();

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
              <p className="text-lg">Room Code: {room}</p>
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
              <h2 className="text-xl font-semibold">
                {nextQuestion.qid}. {nextQuestion.question}
              </h2>
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
                disabled={submit}
                onClick={handleSubmitAnswer}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Submit Answer
              </button>
              {typeof isCorrect === "boolean" && (
                <p className="text-black mt-2">
                  {isCorrect ? "Correct Answer!" : "Wrong Answer!"}
                </p>
              )}
              <h1 className="text-blue text-sm">
                name: {contextName} <br />
                currentScore = {currentScore}
              </h1>
            </div>
          )}
        </div>
      )}

      {showScore && leaderboard && (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
          <ol className="text-lg">
            {leaderboard.map(({ rank, user, score }) => (
              <li key={user} className="mb-2">
                <span className="font-semibold">
                  {rank}. {user}
                </span>
                : {score} pts
              </li>
            ))}
          </ol>
          <button
            onClick={handleLeaveRoom}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserQuiz;
