import Button from "./ui/Button";
import { Checkbox } from "./ui/Checkbox/checkbox";
import { Label } from "./ui/Label/label";
import type { CombinedProps } from "../../types/sidebar";
import { Card } from "./ui/Card";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { PRRefreshBar } from "./RefreshBar";

export const FilterSidebar = ({
  statusFilters,
  statusChange,
  resetAll,
  assignees,
  authors,
  onAuthorsChange,
  onAssigneesChange,
  selectedAssignees,
  selectedAuthors,
  organizations,
  selectedOrganizations,
  onOrganizationsChange,
  repos,
  SelectedRepos,
  onReposChange,
}: CombinedProps) => {
  return (
    <div className="p-3 space-y-3">
      <PRRefreshBar
        organizations={organizations}
        selectedOrganizations={selectedOrganizations}
        onOrganizationsChange={onOrganizationsChange}
        repos={repos}
        SelectedRepos={SelectedRepos}
        onReposChange={onReposChange}
      />
      <Card className="w-70  border-r border-border p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Filter</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAll}
            className="h-8 text-xs"
          >
            Reset All
          </Button>
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
                <div className="flex items-center space-x-2">
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
            <h4 className="font-medium text-sm mb-3 text-left">Assignee</h4>
            <MultiSelectDropdown
              options={assignees}
              selected={selectedAssignees}
              onChange={onAssigneesChange}
              placeholder="Select assignees"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
