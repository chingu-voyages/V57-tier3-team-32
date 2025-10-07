import "./App.css";
import { healthCheck } from "./api/healthCheck";
import PRReviewHeader from "./Header";
import { PRTable } from "./components/PRTable";
import type { PR } from "../types/pr";
import Button from "./components/ui/Button";

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

// Mock data
const testPRs: PR[] = [
  {
    id: "1",
    title: "Add skeleton builder for product grid...",
    author: "My Truebody",
    createdAt: "2025-09-16",
    updatedAt: "2025-09-21",
    labels: [],
    repository: "web-frontend",
    reviewers: ["MA:women"],
    comments: 0,
    mergeable: true,
    status: "Open",
    lastActionDate: "13/04/2015",
  },
  {
    id: "2",
    title: "Refactor auth and middleware and add tests...",
    author: "My Stroudyies",
    createdAt: "2025-08-29",
    updatedAt: "2025-09-20",
    labels: [],
    repository: "web-frontend",
    reviewers: ["MA:telecom"],
    comments: 0,
    mergeable: true,
    status: "Open",
    lastActionDate: "13/04/2015",
  },
  {
    id: "3",
    title: "Refactor auth and middleware and add tests...3",
    author: "My Stroudyies3",
    createdAt: "2025-01-22",
    updatedAt: "2025-04-20",
    labels: [],
    repository: "web-frontend",
    reviewers: ["MA:telecom", "alfred"],
    comments: 0,
    mergeable: true,
    status: "Open",
    lastActionDate: "13/04/2018",
  },
  {
    id: "4",
    title: "Refactor auth and add tests...3",
    author: "My Stroudyies4",
    createdAt: "2025-10-22",
    updatedAt: "2025-04-20",
    labels: [],
    repository: "web-frontend",
    reviewers: ["MA:telecom", "nina"],
    comments: 0,
    mergeable: true,
    status: "Open",
    lastActionDate: "13/10/2025",
  },
];

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

export default function App() {
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
        <PRTable pr={testPRs} />
      </div>
    </>
  );
}
