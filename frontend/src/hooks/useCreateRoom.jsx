import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";

const useCreateRoom = () => {
  // const [name, setName] = useState("");
  const { setRoom, sendMessage, name, setName } = useWebSocket();
  const navigate = useNavigate();
  const handleSubmit = async (code) => {
    const playerName = name.trim() + "_admin";
    if (!playerName) {
      console.log("Enter name to create quiz");
      alert("Enter Both Fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Not authorized please signup /login");
      navigate("/login");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7000/api/create-room",
        {
          code: code,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.status === 200) {
        console.log(`Room ${code} has been created`);
        setRoom(code);
        setName(playerName);
        sendMessage({
          type: "validation",
          payload: {
            name: playerName,
            code,
            isAdmin: true,
          },
        });

        navigate(`/admin/${code}`);
      } else {
        alert(`Room with code ${code} already exists`);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleSubmit,
    name,
    setName,
  };
};

export default useCreateRoom;
