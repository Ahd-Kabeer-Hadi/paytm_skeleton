import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../lib/validations";

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or whatever type userId is
    }
  }
}
const AuthMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const AuthToken = req.headers.authorization;

  if (!AuthToken || !AuthToken.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Token not found",
    });
  }
  const Token = AuthToken.split(" ")[1];

  try {
    const decoded = jwt.verify(Token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token not valid",
    });
  }
};

export { AuthMiddleWare };
