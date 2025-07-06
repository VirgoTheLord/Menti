import axios from "axios";
import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebsocketContext";

const useCreateRoom = () => {
  const [name, setName] = useState("");
  const { setRoom, sendMessage } = useWebSocket();
  const navigate = useNavigate();
  const handleSubmit = async (code) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Not authorized please signup /login");
      navigate("/login");
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
        navigate(`/quiz/${code}`);

        setRoom(code);
        sendMessage({
          type: "validation",
          payload: {
            name,
            code,
            isAdmin: true,
          },
        });
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
