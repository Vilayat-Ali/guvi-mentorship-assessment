import type { Request, Response, NextFunction } from "express";
import { getValidatedEnvs } from "../config";
import { verify } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return res.status(201).json({
      message: "Auth Token not provided",
    });
  }

  const token = authHeaders.split(" ")[1];

  verify(
    token,
    getValidatedEnvs().ACCESS_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if (err) {
        return res.json({ message: "Invalid token passed" });
      }

      (req as any).user = decoded;
    }
  );

  next();
};
