const express = require("express");
const cors = require("cors");
const RoomManager = require("./state");
const http = require("http");
const { WebSocketServer } = require("ws");
const connectDB = require("./config/db");
const userRouter = require("./routes/entryRoutes");
const app = express();
const handleValidate = require("./handlers/validationHandler");
const handleFetch = require("./handlers/fetchHandler");
const handleLeave = require("./handlers/leaveHandler");
const handleSubmit = require("./handlers/submitHandler");
// const { Client } = require("pg");
app.use(cors());
app.use(express.json());
const PORT = 7000;

const server = http.createServer(app);
const ws = new WebSocketServer({ server });

connectDB();

app.use("/api/user", userRouter);

app.get("/api/generate-code", (req, res) => {
  try {
    const half1 = Math.floor(1000 + Math.random() * 9000);
    const half2 = Math.floor(1000 + Math.random() * 9000);
    const createdCode = `${half1}-${half2}`;
    return res.status(200).json({
      message: `Code ${createdCode} generated successfully.`,
      code: createdCode,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Code generation was not successful." });
  }
});

app.post("/api/create-room", (req, res) => {
  try {
    const { code } = req.body;
    if (RoomManager.AllRooms().has(code)) {
      return res.status(404).json({ message: "Room Already exists" });
    }

    RoomManager.getRoom(code);
    return res
      .status(200)
      .json({ message: `Room ${code} has been made.`, code });
  } catch (error) {
    return res.status(404).json({ message: "Room creation has failed" });
  }
});

//websochet initializes here.
ws.on("connection", (socket) => {
  socket.on("message", (message) => {
    const data = JSON.parse(message);
    const { type, payload } = data;
    if (type === "validation") {
      handleValidate(socket, payload);
    } else if (type === "fetch-question") {
      handleFetch(socket, payload);
    } else if (type === "leave-room") {
      handleLeave(socket, payload);
    } else if (type === "submit-answer") {
      handleSubmit(socket, payload);
    }
  });
});
app.get("/", (req, res) => {
  res.json("Mentimeter API Working");
});

server.listen(PORT, () => {
  console.log(`Server Listening on http://localhost:${PORT}`);
});
