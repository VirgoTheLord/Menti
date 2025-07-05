import useCreateRoom from "../hooks/useCreateRoom";
import useGenerateCode from "../hooks/useGenerateCode";

const CreateQuiz = () => {
  const { code, setCode, handleGenerateCode } = useGenerateCode();
  const { name, setName, handleSubmit } = useCreateRoom();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-5xl font-bold mb-4">Create a Quiz</h1>
      <p className="text-lg mb-8">
        Enter your name and code to create your quiz.
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
          value={code}
          disabled
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter quiz code"
          className="border border-gray-300 p-2 rounded w-80"
        />
        <button
          onClick={handleGenerateCode}
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Generate Code
        </button>
        <button
          onClick={() => handleSubmit(code)}
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
