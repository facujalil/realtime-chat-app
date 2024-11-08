import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import chatsRoutes from "./routes/chats.routes";
import { authenticateSocket } from "./middleware/authenticateSocket";
import { userEvents } from "./sockets/users.socket";
import { chatEvents } from "./sockets/chats.socket";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const PORT = process.env.PORT || 3001;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(usersRoutes);
app.use(chatsRoutes);

app.use((_req, res) => {
  res.status(404).json({
    message: "Endpoint not found.",
  });
});

io.use(authenticateSocket);

io.on("connection", (socket) => {
  userEvents(io, socket);
  chatEvents(io, socket);
});

server.listen(PORT, () => {
  console.log("Server listening on PORT", PORT);
});
