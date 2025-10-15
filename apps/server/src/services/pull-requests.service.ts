import axios, { AxiosError } from "axios";
import type {
  Assignee,
  NormalizedPR,
  PR,
  RequestedReviewer,
} from "../types/types.js";

export async function fetchAndNormalizePullRequests(
  owner: string,
  repo: string,
  token: string,
  state: string,
  creator?: string,
  assignee?: string,
): Promise<NormalizedPR> {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=${state}`;

  try {
    const response = await axios.get<PR[]>(url, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    const prs = response.data.map((pr: PR) => ({
      prNumber: pr.number,
      title: pr.title,
      url: pr.html_url,
      creator: pr.user.login,
      creationTimestamp: pr.created_at,
      requestedReviewers: pr.requested_reviewers.map(
        (reviewer: RequestedReviewer) => [reviewer.id, reviewer.login],
      ),
      lastActionType: pr.merged_at ? "merged" : pr.state,
      lastActionTimestamp: pr.updated_at,
      assignees: pr.assignees.map((assignee: Assignee) => assignee.login),
    }));

    let filteredPRs = prs;

    if (creator) {
      filteredPRs = filteredPRs.filter((pr) => pr.creator === creator);
    }
    if (assignee) {
      filteredPRs = filteredPRs.filter((pr) => pr.assignees.includes(assignee));
    }

    return { repo: `${owner}/${repo}`, pullRequests: filteredPRs };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (AxiosError.ERR_BAD_REQUEST) {
        throw new Error("Axios BAD Request");
      }
    }

    throw new Error("Failed to fetch pull requests from GitHub API.");
  }
}
