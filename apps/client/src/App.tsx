import "./App.css";
import { usePRContext } from "./contexts/pull-requests";
import { PRProvider } from "./contexts/pull-requests/Provider";
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
