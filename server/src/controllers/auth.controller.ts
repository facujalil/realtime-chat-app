import { Request, Response } from "express";
import { pool } from "../db/connection";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const backgroundColors = [
    "ff9800",
    "e96418",
    "d32f2f",
    "ee5397",
    "388e3c",
    "8e24aa",
  ];
  const avatarUrl = `https://ui-avatars.com/api/?name=${username.replace(
    /[^a-zA-Z0-9]+/g,
    "+"
  )}&background=${
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  }&color=ffffff&size=50&font-size=0.5&bold=true`;

  try {
    const {
      rows: [usernameExists],
    } = await pool.query("SELECT user_id FROM users WHERE username = $1", [
      username,
    ]);
    if (usernameExists) {
      return res.status(409).json({
        message: "Username already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [{ user_id }],
    } = await pool.query(
      "INSERT INTO users(username, password, avatar_url) VALUES($1, $2, $3) RETURNING user_id",
      [username, hashedPassword, avatarUrl]
    );
    return res.status(201).json({ user_id: user_id });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const {
      rows: [user],
    } = await pool.query(
      "SELECT user_id, password FROM users WHERE username = $1",
      [username]
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return res.json({ token: token });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};
