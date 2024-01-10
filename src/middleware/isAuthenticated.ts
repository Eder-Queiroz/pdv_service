import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token não encontrado" });

  const [, token] = authHeader.split(" ");

  if (!token) return res.status(401).json({ message: "Token não encontrado" });

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }

  return next();
}
