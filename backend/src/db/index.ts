import mongoose from "mongoose";
import { userSchema } from "./schemas/user.schema";

export class Mongo {
  public static readonly userModel = mongoose.model("user", userSchema);
}
