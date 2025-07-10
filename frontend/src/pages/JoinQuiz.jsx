import useJoinRoom from "../hooks/useJoinRoom";

const JoinQuiz = () => {
  const { setName, room, setRoom, handleSubmit, name } = useJoinRoom();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-8 py-10 flex flex-col items-center border border-blue-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Join a Quiz
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
          Enter the quiz code and your name to join the quiz.
        </p>
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg w-full text-gray-800 bg-white/90 transition"
            autoComplete="off"
            required
          />
          <input
            type="text"
            placeholder="Enter quiz code"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg w-full text-gray-800 bg-white/90 transition"
            autoComplete="off"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Join Quiz
          </button>
        </form>
        <p className="text-sm mt-6 text-gray-700 text-center">
          Don't have a code?{" "}
          <span className="text-blue-500 font-medium">
            Ask the quiz creator to share it with you.
          </span>
        </p>
      </div>
    </div>
  );
};

export default JoinQuiz;
