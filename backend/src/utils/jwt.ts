import { JwtPayload, sign, verify } from "jsonwebtoken";

export class JWT {
  private static ACCESS_TOKEN_SECRET: string = "";

  public static generateToken<T extends Buffer | string | object>(
    claims: T
  ): string {
    return sign(claims, JWT.ACCESS_TOKEN_SECRET, { expiresIn: "6d" });
  }

  public static verifyToken(token: string): string | JwtPayload {
    return verify(token, JWT.ACCESS_TOKEN_SECRET);
  }
}
