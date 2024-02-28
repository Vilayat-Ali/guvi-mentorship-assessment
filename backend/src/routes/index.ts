import express from "express";

export class ApiRoutes {
  private router: express.Router = express.Router();

  constructor() {
    this.router.use("/", () => {});
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
