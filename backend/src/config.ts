import { ZodError, z } from "zod";

const envZodSchema = z.object({
  PORT: z.string().min(4).transform(Number),
  ACCESS_TOKEN_SECRET: z.string().min(16),
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
