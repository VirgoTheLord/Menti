import { useRef, useContext, useState, createContext, useEffect } from "react";
export const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [room, setRoom] = useState("");
  const [contextName, setContextName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [quizStart, setQuizStart] = useState(false);
  const [validate, setValidate] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [length, setLength] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log("Websocket on app mount");

    socketRef.current = new WebSocket("ws://localhost:7000");

    socketRef.current.onopen = () => {
      console.log("Websocket Connected");
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
        setNextQuestion(data.payload.question);
        setLength(data.payload.length);
        console.log("Quiz started with question:", data.payload);
      }
      if (data.type === "quiz-ended") {
        setQuizStart(false);
        setShowScore(true);
        setLeaderboard(data.leaderboard);
      }
      if (data.type === "next-question") {
        setQuizStart(true);
        setNextQuestion(data.payload);
        console.log("Next question received:", data.payload);
      }
      if (data.type === "submit-answer-response") {
        const { isCorrect, score } = data;
        setCurrentScore((prevScore) => prevScore + score);
        setIsCorrect(isCorrect);
        console.log(
          "Answer submitted and answer recieved.",
          isCorrect,
          "Score:",
          score
        );
      }
      if (data.type === "leave") {
        setPlayers(data.players);
        console.log("A player has left the quiz");
        setCurrentScore(0);
      }
      //global error just made in case it erros out and uses my try catch errors, some may not be configured but catched the useful ones prolly i guess
      if (data.type === "error") {
        console.error("Error from server:", data.message);
        setValidate(false);
      }

      console.log("Received message:", data);
    };
    socketRef.current.onclose = () => {
      console.log("Websocket closed");
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
    setNextQuestion,
    currentScore,
    isCorrect,
    setIsCorrect,
    showScore,
    setShowScore,
    length,
    setLength,
    contextName,
    setContextName,
    leaderboard,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
