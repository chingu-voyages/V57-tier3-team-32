import { fetchPullRequestsService } from "@/services/pull-requests.service";
import {
  createContext,
  use,
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import type { PR } from "types/pr";

interface PRContextType {
  pullRequests: PR[];
  isLoading: boolean;
  error: string | null;
  refreshPullRequests: () => Promise<void>;
}

const PRContext = createContext<PRContextType | undefined>(undefined);

interface PRProviderProps {
  children: ReactNode;
}

export function PRProvider({ children }: PRProviderProps) {
  const [pullRequests, setPullRequests] = useState<PR[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPullRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prs = await fetchPullRequestsService();
      setPullRequests(prs);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch pull requests";
      setError(errorMessage);
      console.error("Error fetching pull requests:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshPullRequests();
  }, [refreshPullRequests]);

  const value = useMemo(
    () => ({
      pullRequests,
      isLoading,
      error,
      refreshPullRequests,
    }),
    [pullRequests, isLoading, error, refreshPullRequests],
  );

  return <PRContext value={value}>{children}</PRContext>;
}

export function usePRContext() {
  const context = use(PRContext);
  if (context === undefined) {
    throw new Error("usePRContext must be used within a PRProvider");
  }
  return context;
}
