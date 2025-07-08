import React, { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const useUser = () => {
  const {
    isConnected,
    players,
    room,
    quizStart,
    contextName,
    setContextName,
    sendMessage,
    nextQuestion,
    isCorrect,
    currentScore,
    showScore,
    setIsCorrect,
    leaderboard,
    length,
  } = useWebSocket();
  const navigate = useNavigate();
  const timeleft = 5;
  const [submit, setSubmit] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  const handleSubmitAnswer = () => {
    if (selectedOption) {
      sendMessage({
        type: "submit-answer",
        payload: {
          qid: nextQuestion.qid,
          timeLeft: timeleft,
          answer: selectedOption,
          code: room,
          name: contextName,
        },
      });
      setSubmit(true);
      setSelectedOption("");
    }
  };

  const handleLeaveRoom = () => {
    sendMessage({
      type: "leave-room",
      payload: {
        name: contextName,
        code: room,
      },
    });
    navigate("/");
    console.log(`User ${contextName} has left the room.`);
    setContextName("");
  };
  useEffect(() => {
    setSubmit(false);
    setSelectedOption("");
    setIsCorrect(null);
  }, [nextQuestion]);

  return {
    handleSubmitAnswer,
    handleLeaveRoom,
    isConnected,
    quizStart,
    players,
    nextQuestion,
    submit,
    isCorrect,
    contextName,
    currentScore,
    showScore,
    room,
    selectedOption,
    setSelectedOption,
    leaderboard,
  };
};

export default useUser;
