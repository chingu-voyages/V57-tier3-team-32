import axios, { AxiosError } from "axios";
import type { NormalizedPR, PR, RequestedReviewer } from "../types/types.js";

import axios from "axios";
import type { NormalizedPR } from "../types/types.js";

interface GitHubUser {
  login: string;
}

interface GitHubPullRequest {
  number: number;
  title: string;
  user: GitHubUser;
  created_at: string;
  requested_reviewers: GitHubUser[];
  merged_at: string | null;
  state: string;
  updated_at: string;
}

export const fetchAndNormalizePullRequests = async (
  owner: string,
  repo: string,
  token: string,
  state: string,
): Promise<NormalizedPR[]> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}`;

  try {
    const response = await axios.get<PR[]>(url, {

): Promise<NormalizedPR> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;

  try {
    const response = await axios.get<GitHubPullRequest[]>(url, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.map((pr: PR) => ({
    const prs = response.data.map((pr) => ({
      prNumber: pr.number,
      title: pr.title,
      creator: pr.user.login,
      creationTimestamp: pr.created_at,
      requestedReviewers: pr.requested_reviewers.map(
        (reviewer: RequestedReviewer) => reviewer.login,
        (reviewer) => reviewer.login,
      ),
      lastActionType: pr.merged_at ? "merged" : pr.state,
      lastActionTimestamp: pr.updated_at,
      url: `https://github.com/${owner}/${repo}/pull/${pr.number}`,
    }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (AxiosError.ERR_BAD_REQUEST) {
        throw new Error("Axios BAD Request");
      }
    }

    return { repo: `${owner}/${repo}`, pullRequests: prs };
  } catch {
    throw new Error("Failed to fetch pull requests from GitHub API.");
  }
};
