import z from "zod";

const envSchema = z.object({
  FRONTEND_URL: z.string(),
  PORT: z
    .string()
    .refine(
      (PORT) => parseInt(PORT) > 0 && parseInt(PORT) < 65536,
      "Invalid Port Number",
    )
    .default("8080"),
  GITHUB_API_TOKEN: z
    .string()
    .refine(
      (GITHUB_API_TOKEN) => GITHUB_API_TOKEN.toString(),
      "INVALID API TOKEN",
    ),
});

type ENV = z.infer<typeof envSchema>;

const Env: ENV = envSchema.parse(process.env);

export default Env;
