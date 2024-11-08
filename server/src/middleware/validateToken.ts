import jwt from "jsonwebtoken";

export const validateToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken;
  } catch (error) {
    return null;
  }
};
