import z from "zod";

const stateSchema = z.object({
  repo: z.string(),
  owner: z.string(),
  state: z
    .string()
    .refine(
      (state) => state === "open" || state === "closed" || state === "merged",
      "Invalid state parameter",
    ),
});

export default stateSchema;
