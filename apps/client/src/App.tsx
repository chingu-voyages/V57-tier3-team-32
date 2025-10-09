import "./App.css";
import PRReviewHeader from "./Header";
import { PRTable } from "./components/PRTable";
import { PRProvider, usePRContext } from "./contexts/pull-requests.context";

function AppContent() {
  const { pullRequests, isLoading, error } = usePRContext();

  return (
    <>
      <div>
        <div>
          <PRReviewHeader></PRReviewHeader>
        </div>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem" }}>
        {isLoading && <p>Loading pull requests...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!isLoading && !error && <PRTable prs={pullRequests} />}
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
