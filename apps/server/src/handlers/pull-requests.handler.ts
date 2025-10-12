import type { Request, Response } from "express";
import { fetchAndNormalizePullRequests } from "../services/pull-requests.service.js";
import Env from "../config/env.js";

export async function getAllPullRequests(
  req: Request,
  res: Response,
): Promise<void> {
  const token = Env.GITHUB_API_TOKEN;
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  const state = req.query.state as string;

  if (!token || !owner || !repo) {
    res.status(500).json({ error: "Missing environment variables." });
    return;
  }

  try {
    const pullRequests = await fetchAndNormalizePullRequests(
      owner,
      repo,
      token,
      state,
    );

    res.status(200).json(pullRequests);
  } catch {
    res.status(500).json({ error: "Internal server error." });
    return;
  }
}
