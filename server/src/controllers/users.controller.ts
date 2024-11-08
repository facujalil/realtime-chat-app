import { Request, Response } from "express";
import { pool } from "../db/connection";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const {
      rows: [user],
    } = await pool.query(
      "SELECT users.user_id, users.username, users.avatar_url FROM users LEFT JOIN connections ON users.user_id = connections.user_id WHERE users.user_id = $1",
      [userId]
    );
    res.json({ user: user });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};
