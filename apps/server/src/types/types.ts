export interface NormalizedPR {
  repo: string;
  pullRequests: {
    prNumber: number;
    title: string;
    creator: string;
    creationTimestamp: string;
    requestedReviewers: string[];
    lastActionType: string;
    lastActionTimestamp: string;
    url: string;
  }[];
}
