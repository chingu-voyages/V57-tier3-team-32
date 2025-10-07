import "./App.css";
import { healthCheck } from "./api/healthCheck";
import PRReviewHeader from "./Header";
import { PRTable } from "./components/PRTable";
import Button from "./components/ui/Button";
import { PRProvider, usePRContext } from "./contexts/pull-requests.context";

const alertHealthCheck = async () => {
  try {
    const response = await healthCheck();
    alert(
      `health check response: ${response.status} - ${JSON.stringify(response.data)}`,
    );
  } catch {
    console.error("health check failed");
  }
};

function HealthCheckButton() {
  return (
    <div className="block">
      <Button
        variant="outline"
        onClick={() => {
          void alertHealthCheck();
        }}
      >
        Health Check
      </Button>
    </div>
  );
}

function AppContent() {
  const { pullRequests, isLoading, error } = usePRContext();

  return (
    <>
      <div>
        <div>
          <PRReviewHeader></PRReviewHeader>
        </div>
        <HealthCheckButton></HealthCheckButton>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button type="button" onClick={() => alertHealthCheck}>
          health check
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

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
