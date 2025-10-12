import z from "zod";

const envSchema = z.object({
  FRONTEND_URL: z.string().trim(),
  PORT: z
    .string()
    .trim()
    .refine(
      (PORT) => Number(PORT) > 1024 && Number(PORT) < 49151,
      "INVALID PORT NUMBER",
    ),
  GITHUB_API_TOKEN: z
    .string()
    .trim()
    .refine(
      (GITHUB_API_TOKEN) => GITHUB_API_TOKEN.toString(),
      "INVALID API TOKEN",
    ),
});

type ENV = z.infer<typeof envSchema>;

const Env: ENV = envSchema.parse(process.env);

export default Env;
