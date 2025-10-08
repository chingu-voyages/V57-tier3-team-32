import "./App.css";
import PRReviewHeader from "./Header";
import { PRTable } from "./components/PRTable";
import { PRProvider, usePRContext } from "./contexts/pull-requests.context";
import Footer from "./components/Footer";
import { FilterSidebar } from "./components/FilterSidebar";
import { useState } from "react";

function AppContent() {
  const { pullRequests, repo, isLoading, error } = usePRContext();
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <div>
          <PRReviewHeader></PRReviewHeader>
        </div>
      </div>

      <div style={{ padding: "1rem" }} className="flex-1">
        {isLoading && <p>Loading pull requests...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!isLoading && !error && (
          <PRTable prs={pullRequests} repo={repo ?? "unknown repo"} />
        )}
      </div>

      <Footer />
    </div>
  );
}
const Sidebar = () => {
  const authors = ["john doe", "jane doe", "bob smith", "sally smith"];
  const assignees = ["sam smith", "sally smith", "bob smith", "mark smith"];
  const [statusFilters, setStatusFilters] = useState({
    open: true,
    draft: true,
    closed: true,
  });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);

  const handleStatusChange = (
    status: keyof typeof statusFilters,
    checked: boolean,
  ) => {
    setStatusFilters((prev) => ({ ...prev, [status]: checked }));
  };

  const handleReset = () => {
    setStatusFilters({
      open: true,
      draft: true,
      closed: true,
    });
    setSelectedAuthors([]);
    setSelectedAssignees([]);
  };
  return (
    <div>
      <FilterSidebar
        statusFilters={statusFilters}
        statusChange={handleStatusChange}
        resetAll={handleReset}
        authors={authors}
        onAuthorsChange={setSelectedAuthors}
        assignees={assignees}
        onAssigneesChange={setSelectedAssignees}
        selectedAuthors={selectedAuthors}
        selectedAssignees={selectedAssignees}
      />
    </div>
  );
};
export default function App() {
  return (
    <PRProvider>
      <AppContent />
      <Sidebar></Sidebar>
    </PRProvider>
  );
}
