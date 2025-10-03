import type { Request, Response, NextFunction } from "express";
import z from "zod";

export const validateParams =
  (schema: z.Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.query);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: error.issues,
        });
      } else {
        res.status(500).json({ error: "Internal Sever Error" });
      }
    }
  };
