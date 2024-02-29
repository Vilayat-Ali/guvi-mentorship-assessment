import type { Request, Response } from "express";
import { compareSync, hashSync } from "bcryptjs";

import { AccountService } from "./service";
import { Mongo } from "../../db";
import { JWT } from "../../utils/jwt";

export class AccountController {
  public static async registerUser(req: Request, res: Response): Promise<any> {
    try {
      const userInfo = AccountService.validateRegisterBody(req.body);

      if (typeof userInfo === "undefined") {
        throw new Error("Invalid request body");
      }

      userInfo["password"] = hashSync(userInfo.password);
      const userInstance = await Mongo.userModel.create(userInfo);

      const payload = {
        id: userInstance._id,
        username: userInfo.username,
        email: userInfo.email,
      };

      const token: string = JWT.generateToken(payload);

      return res.json({
        message: "User registered successfully!",
        access_token: token,
      });
    } catch (err: any) {
      console.log(err);
      return res.json({
        err,
      });
    }
  }

  public static async loginUser(req: Request, res: Response): Promise<any> {
    try {
      const userInfo = AccountService.validateLoginBody(req.body);

      if (typeof userInfo === "undefined") {
        throw new Error("Invalid request body");
      }

      const existingUser = await Mongo.userModel.findOne({ email: userInfo });

      if (!existingUser) {
        throw new Error("Invalid email or account doesn't exists");
      }

      if (!compareSync(userInfo.password, existingUser.password)) {
        throw new Error("Invalid password");
      }

      const payload = {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      };

      const token: string = JWT.generateToken(payload);

      return res.json({
        message: "User logged in successfully!",
        access_token: token,
      });
    } catch (err: any) {
      return res.json({
        err,
      });
    }
  }
}
