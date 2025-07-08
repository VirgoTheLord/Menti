export function getSingletonSocket(setIsConnected) {
  let socket = null;
  socket = new WebSocket("ws://localhost:7000");

  socket.onopen = () => {
    console.log("Websocket Connection Established");
    setIsConnected(true);
  };

  socket.onclose = () => {
    console.log("Websocket connection broken.");
    setIsConnected(false);
  };
  return socket;
}
