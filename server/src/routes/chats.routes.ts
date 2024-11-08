import { Router } from "express";
import { authenticateRequest } from "../middleware/authenticateRequest";
import {
  getChatMessages,
  getPreviousChats,
  removeChat,
} from "../controllers/chats.controller";

const router = Router();

router.get(
  "/api/chats/previous-chats/:userId",
  authenticateRequest,
  getPreviousChats
);

router.get(
  "/api/chats/chat-messages/:userId/:receiverId",
  authenticateRequest,
  getChatMessages
);

router.post("/api/chats/remove-chat", authenticateRequest, removeChat);

export default router;
