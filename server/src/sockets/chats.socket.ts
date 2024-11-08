import { Server, Socket } from "socket.io";
import { pool } from "../db/connection";

export const chatEvents = (io: Server, socket: Socket) => {
  socket.on("send-message", async ({ sender_id, receiver_id, content }) => {
    try {
      const {
        rows: [connection],
      } = await pool.query(
        "SELECT connections.socket_id FROM connections JOIN users ON connections.user_id = users.user_id WHERE connections.user_id = $1",
        [receiver_id]
      );
      const {
        rows: [{ message_id, chat_id, created_at }],
      } = await pool.query(
        "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING message_id, chat_id, created_at",
        [sender_id, receiver_id, content]
      );

      io.to(socket.id).emit("get-message", {
        message_id: message_id,
        chat_id: chat_id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        content: content,
        created_at: created_at,
      });

      if (connection) {
        io.to(connection.socket_id).emit("get-message", {
          message_id: message_id,
          chat_id: chat_id,
          sender_id: sender_id,
          receiver_id: receiver_id,
          content: content,
          created_at: created_at,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });
};
