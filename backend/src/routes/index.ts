import express from "express";

// routes
import { AccountRoutes } from "./account";

export class ApiRoutes {
  private router: express.Router = express.Router();

  constructor() {
    this.router.use("/account", new AccountRoutes().getRouter());
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
