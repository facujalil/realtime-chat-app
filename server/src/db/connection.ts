import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.DB_NAME || "realtime_chat_app_db",
});
