type StatusFilters = {
  open: boolean;
  closed: boolean;
  draft: boolean;
};

export default interface FilterSidebar {
  statusFilters: StatusFilters;
  statusChange: (status: keyof StatusFilters, checked: boolean) => void;
  resetAll: () => void;
  authors: string[];
  selectedAuthors: string[];
  onAuthorsChange: (authors: string[]) => void;
  assignees: string[];
  selectedAssignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
}

export interface MultiSelectDropdownProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}
