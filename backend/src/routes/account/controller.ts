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
      const { id, username, email } = await Mongo.userModel.create(userInfo);

      const payload = {
        id,
        username,
        email,
      };

      const token: string = JWT.generateToken(payload);

      return res.json({
        message: "User registered successfully!",
        access_token: token,
        user: {
          username,
          email,
        },
      });
    } catch (err: any) {
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

      const existingUser = await Mongo.userModel.findOne({
        email: userInfo.email,
      });

      if (!existingUser) {
        return res.status(500).json({
          message: "User doesnt exists",
        });
      }

      if (!compareSync(userInfo.password, existingUser.password)) {
        return res.status(500).json({
          message: "Invalid credentials",
        });
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
        user: {
          username: existingUser.username,
          email: existingUser.email,
        },
      });
    } catch (err: any) {
      return res.status(500).json(err);
    }
  }
}
