import { Card, CardContent } from "../components/ui/Card";
import { RefreshCw } from "lucide-react";
import Button from "./ui/Button";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import type { PRRefreshBarProps } from "../../types/sidebar";
export const PRRefreshBar = ({
  organizations,
  selectedOrganizations,
  onOrganizationsChange,
  repos,
  SelectedRepos,
  onReposChange,
}: PRRefreshBarProps) => {
  return (
    <div className="w-full  top-0  bg-white  border-slate-200">
      <Card className="rounded-2xl  border-0 outline-gray-400 ">
        <CardContent className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-3">
          <div className="w-full">
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <MultiSelectDropdown
                  options={organizations}
                  selected={selectedOrganizations}
                  onChange={onOrganizationsChange}
                  placeholder="Choose Organizations....."
                />
              </div>
              <div className="flex-1 max-w-xs">
                <MultiSelectDropdown
                  options={repos}
                  selected={SelectedRepos}
                  onChange={onReposChange}
                  placeholder="Choose Repos....."
                />
              </div>
              <Button className="ml-auto gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
