import { useRef, useContext, useState, createContext, useEffect } from "react";

export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [quizStart, setQuizStart] = useState(false);
  const [validate, setValidate] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:7000");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "players-update") {
        setPlayers(data.players);
      }
      //just a check i added to prevent direct redirect navigate to quiz page thats all
      if (data.type === "validation-success") {
        setValidate(true);
      }
      if (data.type === "quiz-started") {
        setQuizStart(true);
        setNextQuestion(data.payload);
        console.log("Quiz started with question:", data.payload);
      }
      if (data.type === "quiz-ended") {
        setQuizStart(false);
      }
      if (data.type === "next-question") {
        setNextQuestion(data.payload);
        console.log("Next question received:", data.payload);
      }
      //global error just made in case it erros out and uses my try catch errors, some may not be configured but catched the useful ones prolly i guess
      if (data.type === "error") {
        console.error("Error from server:", data.message);
        setValidate(false);
      }
      console.log("Received message:", data);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = (obj) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(obj));
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  const contextValue = {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    room,
    setRoom,
    players,
    validate,
    quizStart,
    setQuizStart,
    nextQuestion,
    name,
    setName,
    setNextQuestion,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
