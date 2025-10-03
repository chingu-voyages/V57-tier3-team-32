import axios, { AxiosError } from "axios";
import type { NormalizedPR, PR, RequestedReviewer } from "../types/types.js";

export const fetchAndNormalizePullRequests = async (
  owner: string,
  repo: string,
  token: string,
): Promise<NormalizedPR[]> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;

  try {
    const response = await axios.get<PR[]>(url, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.map((pr: PR) => ({
      prNumber: pr.number,
      title: pr.title,
      creator: pr.user.login,
      creationTimestamp: pr.created_at,
      requestedReviewers: pr.requested_reviewers.map(
        (reviewer: RequestedReviewer) => reviewer.login,
      ),
      lastActionType: pr.merged_at ? "merged" : pr.state,
      lastActionTimestamp: pr.updated_at,
    }));
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (AxiosError.ERR_BAD_REQUEST) {
        throw new Error("Axios BAD Request");
      }
    }
    throw new Error("Failed to fetch pull requests from GitHub API.");
  }
};
