import type { Request, Response, NextFunction } from "express";
import z from "zod";

export const validateParams =
  (schema: z.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((err) => err.message);
        return res.status(422).json({
          error: messages,
        });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
