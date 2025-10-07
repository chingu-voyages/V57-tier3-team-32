export interface PR {
  id: string;
  title: string;
  author: string;
  status: "Open" | "Closed" | "Merged" | "Draft";
  createdAt: string;
  updatedAt: string;
  labels: string[];
  repository: string;
  reviewers: string[];
  comments: number;
  mergeable: boolean;
  lastActionDate: string;
}
