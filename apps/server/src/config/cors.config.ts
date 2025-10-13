import Env from "./env.js";

const FRONTEND_URL = Env.FRONTEND_URL;

if (FRONTEND_URL == undefined) {
  throw new Error("FRONTEND_URL env var not set");
}

export const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  credentials: true,
};
