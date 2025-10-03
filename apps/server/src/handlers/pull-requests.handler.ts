import type { Request, Response } from "express";
import { fetchAndNormalizePullRequests } from "../services/pull-requests.service.js";
import Env from "../config/env.js";
import type { NormalizedPR } from "../types/types.js";

export const getAllPullRequests = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = Env.GITHUB_API_TOKEN;
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  if (!token) {
    res.status(500).json({ error: "Missing environment variables." });
    return;
  }

  try {
    const pullRequests = await fetchAndNormalizePullRequests(
      owner,
      repo,
      token,
    );
    res.status(200).json(pullRequests);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "Internal server error." });
      return;
    }
  }
};

export const filterPullRequestByState = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = Env.GITHUB_API_TOKEN;
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;
  const state = req.query.state as string;

  if (!token) {
    res.status(500).json({ error: "Missing API Token" });
    return;
  }
  if (!owner || !repo || !state) {
    res.status(400).json({ error: "Missing Parameters" });
    return;
  }
  try {
    const pullRequests = await fetchAndNormalizePullRequests(
      owner,
      repo,
      token,
    );
    const results = pullRequests.filter(
      (pr: NormalizedPR) => pr.lastActionType === state,
    );
    res.status(200).json(results);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "Internal server error." });
      return;
    }
  }
};
