import React from "react";

const UserQuiz = () => {
  return (
    //first a loading screen with players in room shown then questions one by one and then end
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">User Quiz</h1>
      <p className="text-lg">Loading quiz...</p>
      {/* Placeholder for loading screen */}
      <div className="mt-4">
        <p>Players in room:</p>
        <ul className="list-disc list-inside">
          <li>Player 1</li>
          <li>Player 2</li>
          <li>Player 3</li>
        </ul>
      </div>
      {/* Placeholder for questions */}
      <div className="mt-8">
        <p className="text-lg">Question 1: What is the capital of France?</p>
        <ul className="list-disc list-inside mt-2">
          <li>A) Berlin</li>
          <li>B) Madrid</li>
          <li>C) Paris</li>
          <li>D) Rome</li>
        </ul>
      </div>
      {/* Placeholder for end screen */}
      <div className="mt-8">
        <p className="text-lg">Quiz Ended!</p>
        <p className="text-md">Your score: 10/10</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Results
        </button>
      </div>
    </div>
  );
};

export default UserQuiz;
