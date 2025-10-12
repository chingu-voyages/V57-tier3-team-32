import z from "zod";

const repoOwnerSchema = z.object({
  repo: z
    .string()
    .trim()
    .min(1, {
      error: (iss) => {
        if (iss.input === undefined) {
          return `Missing Query Parameter repo`;
        } else {
          return `Invalid Query Parameter repo`;
        }
      },
    }),
  owner: z
    .string()
    .trim()
    .min(1, {
      error: (iss) => {
        if (iss.input === undefined) {
          return `Missing Query Parameter owner`;
        } else {
          return `Invalid Query Parameter owner`;
        }
      },
    }),
  state: z
    .enum(["open", "closed", "all"], {
      error: (iss) => {
        if (iss.input === undefined) {
          return `Missing Query Parameter state`;
        } else {
          return `Invalid Query Parameter state. Expected ${iss.values.join(", ")}`;
        }
      },
    })
    .default("all"),
});

export default repoOwnerSchema;
