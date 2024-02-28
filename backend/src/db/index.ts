import mongoose from "mongoose";
import { userSchema } from "./schemas/user.schema";

export class Mongo {
  private readonly mongoUri: string = "mongodb://localhost:27017/guvi";

  // models
  public static readonly userModel = mongoose.model("user", userSchema);

  public async establishConnection(): Promise<void> {
    try {
      await mongoose.connect(this.mongoUri);
      console.log("DB connection established");
    } catch (err: any) {
      console.log(err);
      process.exit(1);
    }
  }

  public static diagnose(): void {
    console.log("Total Connections: ", mongoose.connections.length);
    let idx: number = 0;
    console.log("\n");
    for (const conn of mongoose.connections) {
      console.log(
        `State of connection idx: ${idx} : ${
          conn.readyState === 1
            ? "connected"
            : conn.readyState === 0
            ? "disconnected"
            : conn.readyState === 2
            ? "connecting"
            : conn.readyState === 3
            ? "disconnecting"
            : "uninitialised"
        }`
      );
      idx++;
    }
  }
}
