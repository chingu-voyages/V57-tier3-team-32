import { createContext } from "react";
import type { PR } from "@/types/pr";
interface PRContextType {
  pullRequests: PR[];
  repo: string | null;
  isLoading: boolean;
  error: string | null;
  refreshPullRequests: () => Promise<void>;
}

const PRContext = createContext<PRContextType | undefined>(undefined);

export default PRContext;
