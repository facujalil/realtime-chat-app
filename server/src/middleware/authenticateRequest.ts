import { Response, NextFunction, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { validateToken } from "./validateToken";

interface IAuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticateRequest = (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  const decodedToken = validateToken(token);
  if (!decodedToken) {
    res.status(403).json({ message: "Invalid token." });
    return;
  }
  req.user = decodedToken;
  next();
};
