export interface PR {
  id: string;
  title: string;
  author: string;
  status: "Open" | "Closed" | "Merged" | "Draft";
  createdAt: string;
  updatedAt: string;
  reviewers: string[];
  lastActionDate: string;
}

export interface ApiPullRequest {
  prNumber: number;
  title: string;
  creator: string;
  creationTimestamp: string;
  requestedReviewers: string[];
  lastActionType: "Open" | "Closed" | "Merged" | "Draft";
  lastActionTimestamp: string;
}
