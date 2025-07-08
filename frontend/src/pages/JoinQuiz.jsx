import useJoinRoom from "../hooks/useJoinRoom";

const JoinQuiz = () => {
  const { setName, room, setRoom, handleSubmit, name } = useJoinRoom();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-5xl font-bold mb-4">Join a Quiz</h1>
      <p className="text-lg mb-8">
        Enter the quiz code and your name to join the quiz.
      </p>
      <div className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-80"
        />
        <input
          type="text"
          placeholder="Enter quiz code"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="border border-gray-300 p-2 rounded w-80"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Join Quiz
        </button>
      </div>
      <p className="text-sm mt-4">
        Don't have a code? Ask the quiz creator to share it with you.
      </p>
    </div>
  );
};

export default JoinQuiz;
