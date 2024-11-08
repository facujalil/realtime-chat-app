import { Socket } from "socket.io";
import { JwtPayload } from "jsonwebtoken";
import { validateToken } from "./validateToken";

interface IAuthSocket extends Socket {
  user?: string | JwtPayload;
}

export const authenticateSocket = (
  socket: IAuthSocket,
  next: (error?: Error) => void
) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("No token provided."));
  }

  const decodedToken = validateToken(token);
  if (!decodedToken) {
    return next(new Error("Invalid token."));
  }
  socket.user = decodedToken;
  next();
};
