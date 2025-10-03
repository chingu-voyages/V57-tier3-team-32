import z from "zod";

const repoOwnerSchema = z.object({
  repo: z.string(),
  owner: z.string(),
});

export default repoOwnerSchema;
