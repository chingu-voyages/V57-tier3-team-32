export interface NormalizedPR {
  prNumber: number;
  title: string;
  creator: string;
  creationTimestamp: string;
  requestedReviewers: string[];
  lastActionType: string;
  lastActionTimestamp: string;
}