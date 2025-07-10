import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { email, setEmail, password, setPassword, handleSubmit } = useLogin();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-5xl font-bold mb-4">Login</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-gray-300 p-2 rounded w-80"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded w-80"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <a
          onClick={() => navigate("/signup")}
          className="text-blue-500 hover:underline"
        >
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
