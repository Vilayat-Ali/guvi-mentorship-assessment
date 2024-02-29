import { Mongo } from "../../db";

export class ProfileService {
  public static fetchUserProfile(userId: string): Promise<any> {
    return Mongo.userModel.findById(userId, { password: 0 });
  }
}
