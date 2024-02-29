import { Response } from "express";
import { ProfileService } from "./service";
import AuthenticatedRequest from "../../interfaces/Request";

export class ProfileController {
  public static async getMyProfile(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<any> {
    try {
      const userId: string = req.user.id;
      const user = await ProfileService.fetchUserProfile(userId);
      return res.status(200).json({ user });
    } catch (error: any) {
      return res.json({ error });
    }
  }
}
