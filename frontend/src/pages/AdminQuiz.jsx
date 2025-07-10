import { useWebSocket } from "../context/WebSocketContext";
import useAdmin from "../hooks/useAdmin";

const AdminQuiz = () => {
  const { players, length } = useWebSocket();
  const {
    handleStartQuiz,
    handleNextQuestion,
    handleEndQuiz,
    handleCloseRoom,
    room,
    quizStart,
    qid,
  } = useAdmin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center border border-blue-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-2 text-center">
          Admin Quiz Page
        </h1>
        <p className="text-lg text-gray-700 mb-2 text-center">
          Manage your quiz here.
        </p>
        <div className="flex flex-col md:flex-row md:space-x-8 mb-6 w-full justify-center">
          <div className="mb-2 md:mb-0">
            <span className="font-semibold text-gray-600">Room Code:</span>
            <span className="ml-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono">
              {room}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Players:</span>
            <span className="ml-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-bold">
              {players.length}
            </span>
          </div>
        </div>
        {!quizStart ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              onClick={handleStartQuiz}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Start Quiz
            </button>
            <button
              onClick={handleCloseRoom}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Delete/Leave Room
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              disabled={qid >= length}
              onClick={handleNextQuestion}
              className={`w-full bg-blue-500 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                qid >= length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              Next Question
            </button>
            <button
              onClick={handleEndQuiz}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              End Quiz
            </button>
          </div>
        )}
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-3 text-blue-600 text-center">
            Current Players
          </h2>
          {players.length > 0 ? (
            <ul className="flex flex-wrap gap-3 justify-center">
              {players.map((player, id) => (
                <li
                  key={id}
                  className="px-4 py-2 bg-blue-100 rounded-full text-blue-700 font-medium shadow-sm"
                >
                  {player}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">
              No players have joined yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuiz;
