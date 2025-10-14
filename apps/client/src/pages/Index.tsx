import { useState, useMemo } from "react";
import type { PR } from "@/types/pr";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "../components/ui/Sheet/sheet";
import { Filter, RefreshCw } from "lucide-react";
import { Card } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FilterSidebar } from "../components/FilterSidebar";
import Footer from "@/components/Footer";
import PRReviewHeader from "../Header";
import { PRTable } from "../components/PRTable";

export const Index = ({
  prs,
  isLoading,
  repo,
  error,
}: {
  prs: PR[];
  isLoading: boolean;
  repo: string | null;
  error: string | null;
}) => {
  //mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const authors = ["john doe", "jane doe", "bob smith", "sally smith"];
  // const reviewers = ["sam smith", "sally smith", "bob smith", "mark smith"];
  const [statusFilters, setStatusFilters] = useState({
    open: true,
    draft: true,
    closed: true,
    merged: true,
  });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
  const authors = Array.from(new Set(prs.map((pr) => pr.author)));
  const reviewers = Array.from(new Set(prs.flatMap((pr) => pr.reviewers)));

  const filteredPRs = useMemo(() => {
    return prs.filter((pr) => {
      if (!statusFilters[pr.status.toLowerCase() as keyof typeof statusFilters])
        return false;

      if (selectedAuthors.length > 0 && !selectedAuthors.includes(pr.author))
        return false;

      if (selectedReviewers.length > 0) {
        const hasSelectedReviewer = selectedReviewers.some((assignee) =>
          pr.reviewers.includes(assignee),
        );
        if (!hasSelectedReviewer) return false;
      }

      return true;
    });
  }, [prs, statusFilters, selectedAuthors, selectedReviewers]);

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
      merged: true,
    });
    setSelectedAuthors([]);
    setSelectedReviewers([]);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <div>
          <PRReviewHeader />
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="md:flex-shrink-0">
          {/* Mobile Sidebar */}
          <Card className="p-3 mx-2 border-gray-400 md:hidden">
            <div className="px-4 py-3 flex items-center justify-between">
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
                    reviewers={reviewers}
                    selectedReviewers={selectedReviewers}
                    onReviewersChange={setSelectedReviewers}
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

          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar
              statusFilters={statusFilters}
              statusChange={handleStatusChange}
              resetAll={handleReset}
              authors={authors}
              onAuthorsChange={setSelectedAuthors}
              reviewers={reviewers}
              onReviewersChange={setSelectedReviewers}
              selectedAuthors={selectedAuthors}
              selectedReviewers={selectedReviewers}
            />
          </div>
        </div>

        <div
          style={{ padding: "0.5rem", paddingTop: "1.4rem" }}
          className="flex-1"
        >
          {isLoading && <p>Loading pull requests...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {!isLoading && !error && (
            <PRTable prs={filteredPRs} repo={repo ?? "unknown repo"} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
