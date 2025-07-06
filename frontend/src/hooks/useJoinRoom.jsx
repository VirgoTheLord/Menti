import { useEffect, useState } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const useJoinRoom = () => {
  const { sendMessage, validate, name, room, setName, setRoom } =
    useWebSocket();
  // const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  const handleSubmit = () => {
    const room = code.trim();
    const playerName = name.trim();
    try {
      if (!room || !playerName) {
        console.log("Please enter both name and quiz code.");
        return;
      }
      sendMessage({
        type: "validation",
        payload: {
          name: playerName,
          code: room,
          isAdmin: false,
        },
      });
      setRoom(room);
    } catch (error) {
      console.log("Error joining quiz:", error);
    }
  };

  useEffect(() => {
    if (validate) {
      navigate(`/quiz/${code}`);
    }
  }, [validate]);
  return {
    name,
    setName,
    code,
    setCode,
    handleSubmit,
  };
};

export default useJoinRoom;
