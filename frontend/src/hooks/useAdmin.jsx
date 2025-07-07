import { useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
const useAdmin = () => {
  const { sendMessage, room, isConnected, quizStart, setQuizStart } =
    useWebSocket();

  if (!isConnected) {
    console.log("Websocket not connected error");
    return <p>Connecting....</p>;
  }

  const handleStartQuiz = () => {
    sendMessage({
      type: "admin",
      payload: {
        action: "start-quiz",
        code: room,
      },
    });
    setQuizStart(true);
  };

  const handleNextQuestion = () => {
    sendMessage({
      type: "admin",
      payload: {
        action: "next-question",
        code: room,
      },
    });
  };

  const handleEndQuiz = () => {
    sendMessage({
      type: "admin",
      payload: {
        action: "end-quiz",
        code: room,
      },
    });
    setQuizStart(false);
  };
  return {
    handleStartQuiz,
    handleNextQuestion,
    handleEndQuiz,
    room,
    quizStart,
  };
};

export default useAdmin;
