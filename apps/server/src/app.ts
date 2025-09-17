import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.config.js";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(function logIncomingRequests(req, _, next) {
  console.info(
    `${new Date().toISOString().slice(11, 19)} ${req.method} initiated on ${req.path}`,
  );
  next();
});

app.get("/health", function (_, res) {
  // changed to json for testing
  res.status(200).json({ message: "OK" });
});

app.use(function notFound(_, res) {
  res.status(404).json({ message: "Route not found" });
});

export default app;
