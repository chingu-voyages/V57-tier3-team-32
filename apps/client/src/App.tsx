import "./App.css";
import { PRProvider } from "./contexts/PRProvider";
import { usePRContext } from "./contexts/pull-requests.context";
import { Index } from "./pages/Index";

function AppContent() {
  const { pullRequests, repo, isLoading, error } = usePRContext();
  return (
    <Index prs={pullRequests} repo={repo} isLoading={isLoading} error={error} />
  );
}

export default function App() {
  return (
    <PRProvider>
      <AppContent />
    </PRProvider>
  );
}
