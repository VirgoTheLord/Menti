import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const useJoinRoom = () => {
  const { sendMessage, validate, room, setContextName, setRoom } =
    useWebSocket();
  const [name, setName] = useState("");

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
      setContextName(playerName);

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
    setContextName,
    room,
    setRoom,
    handleSubmit,
    name,
    setName,
  };
};

export default useJoinRoom;
