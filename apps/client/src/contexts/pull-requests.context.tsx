import { use } from "react";
import PRContext from "./PRContextType";

export function usePRContext() {
  const context = use(PRContext);
  if (context === undefined) {
    throw new Error("usePRContext must be used within a PRProvider");
  }
  return context;
}
