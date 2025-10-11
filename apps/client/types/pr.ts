export interface PR {
  id: string;
  title: string;
  author: string;
  status: "Open" | "Closed" | "Merged" | "Draft";
  createdAt: string;
  updatedAt: string;
  reviewers: string[];
  lastActionDate: string;
  url: string;
}

export interface ApiPullRequest {
  repo: string;
  pullRequests: {
    prNumber: number;
    title: string;
    creator: string;
    creationTimestamp: string;
    requestedReviewers: string[];
    lastActionType: "Open" | "Closed" | "Merged" | "Draft";
    lastActionTimestamp: string;
    url: string;
  }[];
}
