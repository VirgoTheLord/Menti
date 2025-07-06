import { useRef, useContext, useState, createContext, useEffect } from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:7000");

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
