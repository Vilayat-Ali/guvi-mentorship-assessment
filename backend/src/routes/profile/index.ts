import express from "express";
import { ProfileController } from "./controller";
import { Middleware } from "../../middlewares";

export class ProfileRoutes {
  private readonly router: express.Router = express.Router();

  constructor() {
    this.router.use(Middleware.AuthMiddleware);
    this.router.get("/", ProfileController.getMyProfile as any);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
