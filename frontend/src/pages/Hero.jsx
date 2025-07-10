import React from "react";
import { useNavigate } from "react-router-dom";

// Professional & clean: subtle gradient, glass card, modern font, improved button UI, fully responsive.

const Hero = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl px-8 py-12 flex flex-col items-center border border-blue-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight text-center">
          Welcome to <span className="text-blue-500">MentiMeter Clone</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 text-center">
          Create and join quizzes with ease!
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          {token ? (
            <>
              <button
                onClick={() => navigate("/create")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Create Quiz
              </button>
              <button
                onClick={() => navigate("/join-quiz")}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Join Quiz
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
