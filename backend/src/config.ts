import { ZodError, z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envZodSchema = z.object({
  PORT: z
    .string()
    .min(4, {
      message: "Invalid PORT number passed",
    })
    .transform(Number),
  ACCESS_TOKEN_SECRET: z.string().min(16),
  MONGO_URI: z
    .string()
    .min(1, {
      message: "Mongodb URI not passed in ENV",
    })
    .regex(
      /^(mongodb(?:\+srv)?:\/\/(?:[^:@,/\s]+(?::[^:@,/\s]+)?@)?(?:[^:@,/\s]+\.[^:@,/\s]+\.[^:@,/\s]+(?:\.[^:@,/\s]+)?)(?::\d{1,5})?(?:\/[^:@,/\s]+)?(?:\?[^:@,/\s]+=[^:@,/\s]+(?:&[^:@,/\s]+=[^:@,/\s]+)*)?(?:#[^:@,/\s]+)?)/,
      {
        message: "Invalid Mongodb URI passed",
      }
    ),
});

export const getValidatedEnvs = (): z.infer<typeof envZodSchema> => {
  try {
    return envZodSchema.parse(process.env);
  } catch (err: any) {
    if (err instanceof ZodError) {
      for (const zError of err.errors) {
        console.error(`${zError.code}: ${zError.message} @ ${zError.path}`);
      }
    }
    process.exit(1);
  }
};
