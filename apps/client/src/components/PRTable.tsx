import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

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

export function PRTable({ pr }: PRTableProps) {
  const sortedPR = [...pr].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 overflow-auto">
      <Table>
        <TableCaption className="text-gray-500 text-sm py-4">
          List of pull requeests
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow className="border-b border-gray-200 hover:bg-transparent">
            <TableHead className="font-semibold text-gray-700 py-3 min-w-[80px]">
              #PR
            </TableHead>

            <TableHead className="font-semibold text-gray-700 py-3 min-w-[200px]">
              Title
            </TableHead>

            <TableHead className="font-semibold text-gray-700 py-3 min-w-[120px]">
              Author
            </TableHead>

            <TableHead className="font-semibold text-gray-700 py-3 min-w-[100px]">
              Created
            </TableHead>

            <TableHead className="font-semibold text-gray-700 py-3 min-w-[150px] hidden lg:table-cell">
              Reviewers
            </TableHead>

            <TableHead className="font-semibold text-gray-700 py-3 min-w-[120px] hidden xl:table-cell">
              Last Action
            </TableHead>

            <TableHead className="font-semibold text-gray-700 py-3 min-w-[100px] hidden lg:table-cell">
              Last Action Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPR.map((pullRequest) => (
            <TableRow
              key={pullRequest.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium text-gray-900 py-3 min-w-[80px]">
                #{pullRequest.id}
              </TableCell>

              <TableCell className="font-medium py-3 min-w-[200px] text-blue-600 hover:text-blue-800 cursor-pointer">
                {pullRequest.title}
              </TableCell>

              <TableCell className="text-gray-700 py-3 min-w-[120px]">
                {pullRequest.author}
              </TableCell>

              <TableCell className="text-gray-700 py-3 min-w-[100px]">
                {pullRequest.createdAt}
              </TableCell>

              <TableCell className="text-gray-700 py-3 min-w-[150px] hidden lg:table-cell">
                {pullRequest.reviewers.join("-")}
              </TableCell>

              <TableCell className="py-3 min-w-[100px] hidden lg:table-cell">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    pullRequest.status === "Open"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : pullRequest.status === "Merged"
                        ? "bg-purple-100 text-purple-800 border border-purple-200"
                        : pullRequest.status === "Draft"
                          ? "bg-gray-100 text-gray-800 border border-gray-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {pullRequest.status}
                </span>
              </TableCell>
              <TableCell className="text-gray-700 py-3 min-w-[120px] hidden xl:table-cell">
                {pullRequest.lastActionDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
