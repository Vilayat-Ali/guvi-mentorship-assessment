import express from "express";

import { Middleware } from "../middlewares";

// routes
import { AccountRoutes } from "./account";
import { ProfileRoutes } from "./profile";

export class ApiRoutes {
  private router: express.Router = express.Router();

  constructor() {
    this.router.use("/account", new AccountRoutes().getRouter());
    this.router.use("/profile", new ProfileRoutes().getRouter());
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
