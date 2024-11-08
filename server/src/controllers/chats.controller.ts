import { Request, Response } from "express";
import { pool } from "../db/connection";

export const getPreviousChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { rows: users } = await pool.query(
      `
        SELECT 
          user_chats.chat_id,
          users.user_id,
          users.username,
          users.avatar_url,
          chats.last_message,
          chats.last_message_created_at
        FROM
          user_chats
        JOIN
          users ON user_chats.user_id = users.user_id
        JOIN 
          chats ON user_chats.chat_id = chats.chat_id
        WHERE
          user_chats.chat_id IN (
            SELECT chat_id 
            FROM user_chats 
            WHERE user_id = $1
          )
          AND (
            NOT EXISTS (
              SELECT 1
              FROM deleted_chats
              WHERE chat_id = user_chats.chat_id
                AND user_id = $1
            )
            OR (
              chats.last_message_created_at > (
                SELECT deleted_at
                FROM deleted_chats
                WHERE chat_id = user_chats.chat_id
                  AND user_id = $1
              )
            )
          )
          AND users.user_id != $1
        ORDER BY
          chats.last_message_created_at DESC
      `,
      [userId]
    );
    res.json({ users: users });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const getChatMessages = async (req: Request, res: Response) => {
  try {
    const { userId, receiverId } = req.params;
    const {
      rows: [user_chat],
    } = await pool.query(
      "SELECT chat_id FROM user_chats WHERE user_id = $1 AND chat_id IN (SELECT chat_id FROM user_chats WHERE user_id = $2)",
      [userId, receiverId]
    );
    if (user_chat) {
      const { rows: messages } = await pool.query(
        "SELECT message_id, chat_id, sender_id, receiver_id, content, created_at FROM messages WHERE chat_id = $1 AND (NOT EXISTS (SELECT 1 FROM deleted_chats WHERE chat_id = $1 AND user_id = $2) OR (created_at > (SELECT deleted_at FROM deleted_chats WHERE chat_id = $1 AND user_id = $2)))",
        [user_chat.chat_id, userId]
      );
      res.json({
        messages: messages,
      });
    } else {
      res.json({ messages: [] });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const removeChat = async (req: Request, res: Response) => {
  try {
    const { user_id, receiver_id } = req.body;
    const {
      rows: [{ chat_id }],
    } = await pool.query(
      "SELECT chat_id FROM user_chats WHERE user_id = $1 AND chat_id IN (SELECT chat_id FROM user_chats WHERE user_id = $2)",
      [user_id, receiver_id]
    );
    await pool.query(
      "INSERT INTO deleted_chats (chat_id, user_id) VALUES ($1, $2)",
      [chat_id, user_id]
    );
    res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};
