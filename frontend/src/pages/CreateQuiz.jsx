import { useWebSocket } from "../context/WebSocketContext";
import useCreateRoom from "../hooks/useCreateRoom";
import useGenerateCode from "../hooks/useGenerateCode";

const CreateQuiz = () => {
  const { code, setCode, handleGenerateCode } = useGenerateCode();
  const { handleSubmit, name, setName } = useCreateRoom();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-8 py-10 flex flex-col items-center border border-blue-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Create a Quiz
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center">
          Enter your name and generate a code to create your quiz.
        </p>
        <div className="flex flex-col gap-5 w-full">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg w-full text-gray-800 bg-white/90 transition"
            autoComplete="off"
            required
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              disabled
              placeholder="Quiz code"
              className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 bg-gray-100 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleGenerateCode}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Generate
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleSubmit(code)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
