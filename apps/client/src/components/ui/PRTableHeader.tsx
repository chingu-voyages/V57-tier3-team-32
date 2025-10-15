import { RefreshCw } from "lucide-react";

interface PRTableHeaderProps {
  repoName: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function PRTableHeader({
  repoName,
  onRefresh,
  isRefreshing = false,
}: PRTableHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-700">
      <p className="text-black text-lg font-bold">{repoName}</p>
      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white rounded-md transition-colors"
      >
        <RefreshCw
          className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>
  );
}
