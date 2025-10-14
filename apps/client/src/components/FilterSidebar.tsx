import Button from "./ui/Button";
import { Checkbox } from "./ui/Checkbox/checkbox";
import { Label } from "./ui/Label/label";
import type { FilterSidebarProp } from "@/types/sidebar";
import { Card } from "./ui/Card";
import { MultiSelectDropdown } from "./MultiSelectDropdown";

export const FilterSidebar = ({
  statusFilters,
  statusChange,
  resetAll,
  reviewers,
  authors,
  onAuthorsChange,
  onReviewersChange,
  selectedReviewers,
  selectedAuthors,
  onClose,
}: FilterSidebarProp) => {
  return (
    <div className="p-3 space-y-3 ">
      <Card className="w-full md:w-70  md:border-r border-border p-3 md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Filter</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="h-8 text-xs"
            >
              Reset All
            </Button>
            {onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="h-8 text-xs md:hidden"
              >
                Close
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="">
            <h4 className="font-medium text-sm mb-3 text-left">Status</h4>
            <div className="space-y-2.5 px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="open"
                    checked={statusFilters.open}
                    onCheckedChange={(checked) =>
                      statusChange("open", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="open"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Open
                  </Label>
                </div>
                <div className="flex items-center space-x-2 pr-2">
                  <Checkbox
                    id="draft"
                    checked={statusFilters.draft}
                    onCheckedChange={(checked) =>
                      statusChange("draft", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="draft"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Draft
                  </Label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="merged"
                    checked={statusFilters.merged}
                    onCheckedChange={(checked) =>
                      statusChange("merged", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="merged"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Merged
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="closed"
                    checked={statusFilters.closed}
                    onCheckedChange={(checked) =>
                      statusChange("closed", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="closed"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Closed
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3 text-left">Author</h4>
            <MultiSelectDropdown
              options={authors}
              selected={selectedAuthors}
              onChange={onAuthorsChange}
              placeholder="Select authors"
            />
          </div>

          <div>
            <h4 className="font-medium text-sm mb-3 text-left">Reviewers</h4>
            <MultiSelectDropdown
              options={reviewers}
              selected={selectedReviewers}
              onChange={onReviewersChange}
              placeholder="Select reviewers"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
