import React from "react";

const Hero = () => {
  const token = localStorage.getItem("token");
  return token ? (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-5xl font-bold mb-4">Welcome to MentiMeter Clone</h1>
      <p className="text-lg mb-8">Create and join quizzes with ease!</p>
      <div className="flex space-x-4">
        <a
          href="/create"
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Create Quiz
        </a>
        <a
          href="/join-quiz"
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Join Quiz
        </a>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-5xl font-bold mb-4">Welcome to MentiMeter Clone</h1>
      <p className="text-lg mb-8">Create and join quizzes with ease!</p>
      <div className="flex space-x-4">
        <a
          href="/login"
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Login
        </a>
        <a
          href="/signup"
          className="bg-blue-400 text-black px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Hero;
