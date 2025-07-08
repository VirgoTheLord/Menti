let socket = null;

export function getSingletonSocket(setIsConnected) {
  if (!socket) {
    socket = new WebSocket("ws://localhost:7000");

    socket.onopen = () => {
      console.log("Websocket Connection Established");
      setIsConnected(true);
    };

    socket.onclose = () => {
      console.log("Websocket connection broken.");
      setIsConnected(false);
    };
  }
  return socket;
}
