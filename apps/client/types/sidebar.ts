type StatusFilters = {
  open: boolean;
  closed: boolean;
  draft: boolean;
};

export interface FilterSidebarProp {
  statusFilters: StatusFilters;
  statusChange: (status: keyof StatusFilters, checked: boolean) => void;
  resetAll: () => void;
  authors: string[];
  selectedAuthors: string[];
  onAuthorsChange: (authors: string[]) => void;
  assignees: string[];
  selectedAssignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
  onClose?: () => void;
  showOrgRepos?: boolean;
}

export interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export interface PRRefreshBarProps {
  organizations: string[];
  selectedOrganizations: string[];
  onOrganizationsChange: (organizations: string[]) => void;
  repos: string[];
  SelectedRepos: string[];
  onReposChange: (repos: string[]) => void;
}

export interface CombinedProps extends FilterSidebarProp, PRRefreshBarProps {}
