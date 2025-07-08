import { useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";
const useAdmin = () => {
  const {
    sendMessage,
    room,
    isConnected,
    quizStart,
    setQuizStart,
    name,
    setName,
  } = useWebSocket();
  const [qid, setQid] = useState(0);
  const navigate = useNavigate();

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
    setQid(1);
  };

  const handleNextQuestion = () => {
    sendMessage({
      type: "admin",
      payload: {
        action: "next-question",
        code: room,
      },
    });
    setQid((prev) => prev + 1);
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
  const handleCloseRoom = () => {
    sendMessage({
      type: "leave-room",
      payload: {
        code: room,
        name: name,
      },
    });
    setName("");
    navigate("/create");
  };
  return {
    handleStartQuiz,
    handleNextQuestion,
    handleEndQuiz,
    handleCloseRoom,
    room,
    quizStart,
    qid,
  };
};

export default useAdmin;
