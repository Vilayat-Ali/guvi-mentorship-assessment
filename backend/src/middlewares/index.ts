import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./auth.middleware";

type MiddlewareType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>> | undefined;

export class Middleware {
  public static readonly AuthMiddleware: MiddlewareType = authMiddleware;
}
