import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import timeAgo from "./ui/utilis";
import { PRTableHeader } from "./ui/PRTableHeader";

interface PR {
  id: string;
  title: string;
  author: string;
  status: "Open" | "Closed" | "Merged" | "Draft";
  createdAt: string;
  lastActionDate: string;
  reviewers: string[];
}

interface PRTableProps {
  pr: PR[];
}

interface Column {
  key: string;
  label: string;
  minWidth: string;
  hideOn: string | null;
}

const columns: Column[] = [
  { key: "id", label: "#PR", minWidth: "80px", hideOn: null },
  { key: "title", label: "Title", minWidth: "200px", hideOn: null },
  { key: "author", label: "Author", minWidth: "120px", hideOn: null },
  { key: "created", label: "Created", minWidth: "100px", hideOn: null },
  { key: "reviewers", label: "Reviewers", minWidth: "150px", hideOn: "lg" },
  { key: "status", label: "Status", minWidth: "100px", hideOn: "lg" },
  {
    key: "lastActionDate",
    label: "Last Action Date",
    minWidth: "120px",
    hideOn: "lg",
  },
];

const getColumnClasses = (column: Column): string => {
  const baseClasses = column.hideOn ? `hidden ${column.hideOn}:table-cell` : "";
  return baseClasses;
};

const handleRefresh = () => {
  console.log("refresh page");
};

export function PRTable({ pr }: PRTableProps) {
  const sortedPR = [...pr].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-auto">
      <PRTableHeader repoName="web-frontend" onRefresh={handleRefresh} />
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`font-semibold text-gray-400 py-3 ${getColumnClasses(column)}`}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {sortedPR.map((pullRequest) => (
            <TableRow
              key={pullRequest.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium text-gray-400 py-3 min-w-[80px]">
                #{pullRequest.id}
              </TableCell>

              <TableCell className="font-medium py-3 min-w-[200px] text-gray-400  cursor-pointer">
                {pullRequest.title}
              </TableCell>

              <TableCell className="text-gray-400 py-3 min-w-[120px]">
                {pullRequest.author}
              </TableCell>

              <TableCell className="text-gray-400 py-3 min-w-[100px]">
                {timeAgo(pullRequest.createdAt)}
              </TableCell>

              <TableCell className="py-3 min-w-[150px] hidden lg:table-cell">
                <div className="flex flex-col gap-1">
                  {pullRequest.reviewers.map((reviewer, index) => {
                    const initials = reviewer.slice(0, 2).toUpperCase();
                    const name = reviewer.slice(2);
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-300 border border-gray-600"
                      >
                        <span className="font-bold text-black mr-1">
                          {initials}
                        </span>
                        <span>{name}</span>
                      </span>
                    );
                  })}
                </div>
              </TableCell>

              <TableCell className="py-3 min-w-[100px] hidden lg:table-cell">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    pullRequest.status === "Open"
                      ? "bg-green-100 text-gray-400 border border-green-200"
                      : pullRequest.status === "Merged"
                        ? "bg-purple-100 text-gray-400 border border-purple-200"
                        : pullRequest.status === "Draft"
                          ? "bg-gray-100 text-gray-400 border border-gray-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {pullRequest.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-400 py-3 min-w-[120px] hidden xl:table-cell">
                {timeAgo(pullRequest.lastActionDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
