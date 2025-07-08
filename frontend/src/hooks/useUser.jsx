import React, { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const useUser = () => {
  const {
    isConnected,
    players,
    room,
    quizStart,
    name,
    setName,
    sendMessage,
    nextQuestion,
    isCorrect,
    currentScore,
    showScore,
    setIsCorrect,
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
          name: name,
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
        name: name,
        code: room,
      },
    });
    navigate("/");
    console.log(`User ${name} has left the room.`);
    setName("");
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
    name,
    currentScore,
    showScore,
    room,
    selectedOption,
    setSelectedOption,
  };
};

export default useUser;
