import { z } from "zod";

const registerZodSchema = z.object({
  username: z.string().min(1).max(25),
  email: z.string().email().toLowerCase().min(1),
  password: z.string().min(8).max(16),
});

const loginZodSchema = z.object({
  email: z.string().email().toLowerCase().min(1),
  password: z.string().min(8).max(16),
});

export class AccountService {
  public static validateRegisterBody(body: any) {
    try {
      return registerZodSchema.parse(body);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public static validateLoginBody(body: any) {
    try {
      return loginZodSchema.parse(body);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
