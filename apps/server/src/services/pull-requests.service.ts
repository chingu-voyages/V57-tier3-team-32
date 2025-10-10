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
): Promise<NormalizedPR> => {
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;

  try {
    const response = await axios.get<GitHubPullRequest[]>(url, {
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
    });

    const prs = response.data.map((pr) => ({
      prNumber: pr.number,
      title: pr.title,
      creator: pr.user.login,
      creationTimestamp: pr.created_at,
      requestedReviewers: pr.requested_reviewers.map(
        (reviewer) => reviewer.login,
      ),
      lastActionType: pr.merged_at ? "merged" : pr.state,
      lastActionTimestamp: pr.updated_at,
      url: `https://github.com/${owner}/${repo}/pull/${pr.number}`,
    }));

    return { repo: `${owner}/${repo}`, pullRequests: prs };
  } catch {
    throw new Error("Failed to fetch pull requests from GitHub API.");
  }
};

// import axios from "axios";
// import type { NormalizedPR } from "../types/types.js";

// export const fetchAndNormalizePullRequests = async (
//   owner: string,
//   repo: string,
//   token: string,
// ): Promise<NormalizedPR> => {
//   const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `token ${token}`,
//         "Content-Type": "application/json",
//       },
//     });

//     const prs = response.data.map((pr: any) => ({
//       prNumber: pr.number,
//       title: pr.title,
//       creator: pr.user.login,
//       creationTimestamp: pr.created_at,
//       requestedReviewers: pr.requested_reviewers.map(
//         (reviewer: any) => reviewer.login,
//       ),
//       lastActionType: pr.merged_at ? "merged" : pr.state,
//       lastActionTimestamp: pr.updated_at,
//       url: `https://github.com/${owner}/${repo}/pull/${pr.number}`,
//     }));

//     return { repo: `${owner}/${repo}`, pullRequests: prs };
//   } catch (error) {
//     throw new Error("Failed to fetch pull requests from GitHub API.");
//   }
// };
