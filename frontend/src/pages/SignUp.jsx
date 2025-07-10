import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  } = useSignUp();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-8 py-10 flex flex-col items-center border border-blue-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-6">
          Sign Up
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-5 w-full"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg w-full text-gray-800 bg-white/90 transition"
            autoComplete="username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg w-full text-gray-800 bg-white/90 transition"
            autoComplete="email"
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-3 rounded-lg w-full text-gray-800 bg-white/90 transition"
            autoComplete="new-password"
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline font-medium transition"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
