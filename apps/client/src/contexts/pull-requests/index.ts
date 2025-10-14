import { createContext, use } from "react";
import type { PR } from "@/types/pr";

interface PRContextType {
  pullRequests: PR[];
  repo: string | null;
  isLoading: boolean;
  error: string | null;
  refreshPullRequests: () => Promise<void>;
}

export const PRContext = createContext<PRContextType | undefined>(undefined);

export function usePRContext() {
  const context = use(PRContext);
  if (context === undefined) {
    throw new Error("usePRContext must be used within a PRProvider");
  }
  return context;
}
