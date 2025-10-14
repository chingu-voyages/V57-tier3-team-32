import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/Dropdown/dropdown-menu";
import type { MultiSelectDropdownProps } from "@/types/sidebar";

export const MultiSelectDropdown = ({
  options,
  selected,
  onChange,
  placeholder = "Select...",
}: MultiSelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  //check if option is selected remove from selected array else add to the selected array
  const handleToggle = (option: string) => {
    if (!option || typeof option !== "string") return;
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const displayText =
    selected.length > 0 ? `${selected.length} selected` : placeholder;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal"
        >
          <span className="truncate">{displayText}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selected.includes(option)}
            onCheckedChange={() => handleToggle(option)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
