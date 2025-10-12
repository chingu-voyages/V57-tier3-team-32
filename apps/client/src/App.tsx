import "./App.css";
import PRReviewHeader from "./Header";
import { PRTable } from "./components/PRTable";
import { PRProvider, usePRContext } from "./contexts/pull-requests.context";

function AppContent() {
  const { pullRequests, repo, isLoading, error } = usePRContext();

  return (
    <>
      <div>
        <div>
          <PRReviewHeader></PRReviewHeader>
        </div>
      </div>

      <div style={{ padding: "1rem" }}>
        {isLoading && <p>Loading pull requests...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!isLoading && !error && (
          <PRTable prs={pullRequests} repo={repo ?? "unknown repo"} />
        )}
      </div>
    </>
  );
}

export default function App() {
  return (
    <PRProvider>
      <AppContent />
    </PRProvider>
  );
}
