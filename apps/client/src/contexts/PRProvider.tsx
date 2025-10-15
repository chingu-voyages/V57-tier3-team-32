import { fetchPullRequestsService } from "@/services/pull-requests.service";
import {
  useState,
  useEffect,
  type ReactNode,
  useMemo,
  useCallback,
} from "react";
import type { PR } from "types/pr";
import PRContext from "./PRContextType";

interface PRProviderProps {
  children: ReactNode;
}

export function PRProvider({ children }: PRProviderProps) {
  const [pullRequests, setPullRequests] = useState<PR[]>([]);
  const [repo, setRepo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPullRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPullRequestsService();
      setPullRequests(data.pullRequests);
      setRepo(data.repo);
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
      repo,
      isLoading,
      error,
      refreshPullRequests,
    }),
    [pullRequests, repo, isLoading, error, refreshPullRequests],
  );

  return <PRContext value={value}>{children}</PRContext>;
}
