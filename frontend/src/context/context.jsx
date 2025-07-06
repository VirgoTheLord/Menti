import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [connected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:7000");

    socketRef.current.onopen = () => {
      //log connected
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      //reciebded data
    };

    socketRef.current.onclose = () => {
      //log disconnect
      setIsConnected(false);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = (obj) => {
    if (socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(obj));
    } else {
      //log socket not ready
    }
  };

  const contextValue = {
    socket: socketRef.current,
    connected,
    room,
    setRoom,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
