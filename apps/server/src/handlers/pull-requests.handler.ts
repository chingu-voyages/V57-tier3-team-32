import type{ Request, Response } from 'express';
import { fetchAndNormalizePullRequests } from '../services/pull-requests.service.js';
import 'dotenv/config';

export const getAllPullRequests = async (req: Request, res: Response): Promise<void> => {
  const token = process.env.GITHUB_API_TOKEN;
  const owner = req.query.owner as string;
  const repo = req.query.repo as string;

  if (!token || !owner || !repo) {
    res.status(500).json({ error: 'Missing environment variables.' });
    return;
  }

  try {
    const pullRequests = await fetchAndNormalizePullRequests(owner, repo, token);
    res.status(200).json(pullRequests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};