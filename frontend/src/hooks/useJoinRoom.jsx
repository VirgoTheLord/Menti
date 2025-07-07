import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const useJoinRoom = () => {
  const { sendMessage, validate, name, room, setName, setRoom } =
    useWebSocket();

  const navigate = useNavigate();
  const handleSubmit = () => {
    const enteredRoom = room.trim();
    const playerName = name.trim();
    try {
      if (!enteredRoom || !playerName) {
        console.log("Please enter both name and quiz code.");
        return;
      }
      setRoom(enteredRoom);

      sendMessage({
        type: "validation",
        payload: {
          name: playerName,
          code: enteredRoom,
          isAdmin: false,
        },
      });
    } catch (error) {
      console.log("Error joining quiz:", error);
    }
  };

  useEffect(() => {
    if (validate) {
      navigate(`/quiz/${room}`);
    }
  }, [validate]);
  return {
    name,
    setName,
    room,
    setRoom,
    handleSubmit,
  };
};

export default useJoinRoom;
