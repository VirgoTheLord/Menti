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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Admin Quiz Page</h1>
      <p className="text-lg mb-2">Manage your quiz here.</p>
      <p className="text-lg mb-4">Room Code: {room}</p>
      <p className="text-lg mb-4">Players: {players.length}</p>
      {!quizStart ? (
        <>
          <button
            onClick={handleStartQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {" "}
            Start Quiz
          </button>
          <button
            onClick={handleCloseRoom}
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {" "}
            Delete/Leave Room
          </button>
        </>
      ) : (
        <>
          <button
            disabled={qid >= length}
            onClick={handleNextQuestion}
            className=" mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next Question
          </button>
          <button
            onClick={handleEndQuiz}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            End Quiz
          </button>
        </>
      )}

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Current Players:</h2>
        <ul className="list-disc pl-5">
          {players.map((player, id) => (
            <li key={id} className="text-lg">
              {player}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminQuiz;
