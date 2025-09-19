import axios from 'axios';
import type{ NormalizedPR } from '../types/types.js';

export const fetchAndNormalizePullRequests = async (owner: string, repo: string, token: string): Promise<NormalizedPR[]> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.map((pr: any) => ({
      prNumber: pr.number,
      title: pr.title,
      creator: pr.user.login,
      creationTimestamp: pr.created_at,
      requestedReviewers: pr.requested_reviewers.map((reviewer: any) => reviewer.login),
      lastActionType: pr.merged_at ? 'merged' : pr.state,
      lastActionTimestamp: pr.updated_at,
    }));
  } catch (error) {
    throw new Error('Failed to fetch pull requests from GitHub API.');
  }
};