import express from "express";
import { AccountController } from "./controller";

export class AccountRoutes {
  private readonly router: express.Router = express.Router();

  constructor() {
    this.router.post("/signup", AccountController.registerUser);
    this.router.post("/login", AccountController.loginUser);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
