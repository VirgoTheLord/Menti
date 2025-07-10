import { useWebSocket } from "../context/WebSocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import useUser from "../hooks/useUser";

// Professional, clean UI: gradient background, glass panel, modern button/input, layout polish.

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-8 py-10 text-center border border-blue-100">
          <p className="text-lg text-blue-700 font-semibold animate-pulse">
            Connecting...
          </p>
        </div>
      </div>
    );
  }

  if (showScore && leaderboard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center border border-blue-100 w-full max-w-lg">
          <h2 className="text-3xl font-extrabold text-blue-600 mb-6">
            Leaderboard
          </h2>
          <ol className="text-lg w-full">
            {leaderboard.map(({ rank, user, score }) => (
              <li key={user} className="mb-2 flex justify-between px-2">
                <span className="font-semibold">
                  {rank}. {user}
                </span>
                <span className="font-bold text-blue-600">{score} pts</span>
              </li>
            ))}
          </ol>
          <button
            onClick={handleLeaveRoom}
            className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Exit
          </button>
        </div>
      </div>
    );
  }

  if (!quizStart) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center border border-blue-100 w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-blue-600 mb-2">
            User Quiz
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Waiting for the quiz to start...
          </p>
          <div className="mb-2">
            <span className="font-semibold text-gray-600">Room Code:</span>
            <span className="ml-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono">
              {room}
            </span>
          </div>
          <div className="mb-3">
            <span className="font-semibold text-gray-600">
              Players in room:
            </span>
            <span className="ml-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold">
              {players.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {players.map((player, id) => (
              <span
                key={id}
                className="px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium shadow-sm"
              >
                {player}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center border border-blue-100 w-full max-w-lg">
        {nextQuestion && (
          <>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {nextQuestion.qid}. {nextQuestion.question}
            </h2>
            <form
              className="flex flex-col gap-5 w-full"
              onSubmit={(e) => {
                e.preventDefault();
                if (!submit) handleSubmitAnswer();
              }}
            >
              {Object.entries(nextQuestion.options).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-center space-x-3 text-lg px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-blue-50 transition"
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
                    <span className="font-semibold text-blue-500">{key}:</span>{" "}
                    {value}
                  </span>
                </label>
              ))}
              <button
                type="submit"
                disabled={submit}
                className={`mt-4 px-6 py-3 rounded-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md ${
                  submit
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Submit Answer
              </button>
            </form>
            {typeof isCorrect === "boolean" && (
              <p
                className={`mt-3 text-lg font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-500"
                }`}
              >
                {isCorrect ? "Correct Answer!" : "Wrong Answer!"}
              </p>
            )}
            <div className="mt-4 text-sm text-gray-700 text-center">
              <span className="block">
                Name:{" "}
                <span className="font-bold text-blue-600">{contextName}</span>
              </span>
              <span className="block">
                Current Score:{" "}
                <span className="font-bold text-green-600">{currentScore}</span>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserQuiz;
