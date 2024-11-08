import { Server, Socket } from "socket.io";
import { pool } from "../db/connection";

export const userEvents = (io: Server, socket: Socket) => {
  socket.on("connect-user", async (user_id) => {
    try {
      await pool.query(
        "INSERT INTO connections (user_id, socket_id) VALUES ($1, $2)",
        [user_id, socket.id]
      );

      const { rows: users } = await pool.query(
        "SELECT users.user_id, users.username, users.avatar_url, connections.socket_id FROM users LEFT JOIN connections ON users.user_id = connections.user_id"
      );
      io.emit("get-all-users", users);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("disconnect", async () => {
    try {
      await pool.query("DELETE FROM connections WHERE socket_id = $1", [
        socket.id,
      ]);
      const { rows: users } = await pool.query(
        "SELECT users.user_id, users.username, users.avatar_url, connections.socket_id FROM users LEFT JOIN connections ON users.user_id = connections.user_id"
      );
      io.emit("get-all-users", users);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("logout", () => {
    socket.disconnect();
  });
};
