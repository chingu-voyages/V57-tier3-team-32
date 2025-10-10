import "./App.css";
import PRReviewHeader from "./Header";
import { PRTable } from "./components/PRTable";
import { PRProvider, usePRContext } from "./contexts/pull-requests.context";
import Footer from "./components/Footer";
import { FilterSidebar } from "./components/FilterSidebar";
import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "./components/ui/Sheet/sheet";
import { Filter, RefreshCw } from "lucide-react";
import { Card } from "./components/ui/Card";
import Button  from "./components/ui/Button";

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
  //mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const authors = ["john doe", "jane doe", "bob smith", "sally smith"];
  const assignees = ["sam smith", "sally smith", "bob smith", "mark smith"];
  const organizations = ["org1", "org2", "org3", "org4"];
  const repos = ["repo1", "repo2", "repo3", "repo4"];
  const [statusFilters, setStatusFilters] = useState({
    open: true,
    draft: true,
    closed: true,
  });
  const [SelectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    [],
  );
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
    setSelectedOrganizations([]);
    setSelectedRepos([]);
  };
  return (
    <>
      <Card className="p-3 mx-2 border-gray-400 md:hidden">
        <div className=" px-4 py-3 flex items-center justify-between">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] sm:w-[400px] p-0">
              <FilterSidebar
                statusFilters={statusFilters}
                statusChange={handleStatusChange}
                resetAll={handleReset}
                authors={authors}
                selectedAuthors={selectedAuthors}
                onAuthorsChange={setSelectedAuthors}
                assignees={assignees}
                selectedAssignees={selectedAssignees}
                onAssigneesChange={setSelectedAssignees}
                organizations={organizations}
                selectedOrganizations={selectedOrganizations}
                onOrganizationsChange={setSelectedOrganizations}
                repos={repos}
                SelectedRepos={SelectedRepos}
                onReposChange={setSelectedRepos}
                showOrgRepos={true}
                onClose={() => setIsSidebarOpen(false)}
              />
            </SheetContent>
          </Sheet>
          <Button size="sm" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </Card>
      <div className="hidden md:block">
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
          organizations={organizations}
          selectedOrganizations={selectedOrganizations}
          onOrganizationsChange={setSelectedOrganizations}
          repos={repos}
          SelectedRepos={SelectedRepos}
          onReposChange={setSelectedRepos}
        />
      </div>
    </>
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
