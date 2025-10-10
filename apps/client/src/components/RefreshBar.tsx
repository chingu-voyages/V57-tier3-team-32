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
        <CardContent className="flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:flex-1 md:max-w-xs">
                <h4 className="font-medium text-sm mb-1  md:hidden text-left">
                  Organization
                </h4>
                <MultiSelectDropdown
                  options={organizations}
                  selected={selectedOrganizations}
                  onChange={onOrganizationsChange}
                  placeholder="Choose Organizations....."
                />
              </div>
              <div className="w-full md:flex-1 md:max-w-xs">
                <h4 className="font-medium text-sm mb-1 md:hidden text-left">
                  Repository
                </h4>
                <MultiSelectDropdown
                  options={repos}
                  selected={SelectedRepos}
                  onChange={onReposChange}
                  placeholder="Choose Repos....."
                />
              </div>
              <Button className="ml-auto gap-2 hidden md:flex">
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
