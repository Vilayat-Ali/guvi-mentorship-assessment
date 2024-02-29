import { sign, verify } from "jsonwebtoken";
import { Response } from "express";
import { getValidatedEnvs } from "../config";

export class JWT {
  private static ACCESS_TOKEN_SECRET: string =
    getValidatedEnvs().ACCESS_TOKEN_SECRET;

  public static generateToken<T extends Buffer | string | object>(
    claims: T
  ): string {
    return sign(claims, JWT.ACCESS_TOKEN_SECRET, { expiresIn: "6d" });
  }

  public static verifyToken(
    token: string,
    handler: (decoded: any) => void,
    handleError: (error: any) => Response<any, Record<string, any>>
  ): void {
    return verify(
      token,
      JWT.ACCESS_TOKEN_SECRET,
      (decoded: any, error: any) => {
        if (error) {
          handleError(error);
        }

        handler(decoded);
      }
    );
  }
}
