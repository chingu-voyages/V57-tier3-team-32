import type { Request, Response } from "express";
import { fetchAndNormalizePullRequests } from "../services/pull-requests.service.js";
import Env from "../config/env.js";

export async function getPullRequests(
  req: Request,
  res: Response,
): Promise<void> {
  const token = Env.GITHUB_API_TOKEN;
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  const state = (req.query.state as string) || "all";
  const creator = req.query.creator as string | undefined;
  const assignee = req.query.assignee as string | undefined;

  try {
    const pullRequests = await fetchAndNormalizePullRequests(
      owner,
      repo,
      token,
      state,
      creator,
      assignee,
    );

    res.status(200).json(pullRequests);
  } catch {
    res.status(500).json({ error: "Internal server error." });
    return;
  }
}
