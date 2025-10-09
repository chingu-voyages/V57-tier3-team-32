import type { ApiPullRequest, PR } from "types/pr";
import { fetchPullRequests } from "../api/fetch-pull-requests";

function mapApiResponseToPR(prs: ApiPullRequest[]): PR[] {
  if (!Array.isArray(prs)) {
    throw new Error("Invalid API response format");
  }

  return prs.map((pr) => ({
    id: pr.prNumber.toString(),
    title: pr.title,
    author: pr.creator,
    createdAt: pr.creationTimestamp,
    updatedAt: pr.lastActionTimestamp,
    reviewers: pr.requestedReviewers || [],
    status: pr.lastActionType,
    lastActionDate: pr.lastActionTimestamp,
  }));
}

export async function fetchPullRequestsService(): Promise<PR[]> {
  try {
    const response = await fetchPullRequests();

    if (response.status !== 200) {
      throw new Error(`Failed to fetch pull requests: ${response.status}`);
    }

    return mapApiResponseToPR(response.data as unknown as ApiPullRequest[]);
  } catch (error) {
    console.error("Error in fetchPullRequestsUseCase:", error);
    throw error;
  }
}
