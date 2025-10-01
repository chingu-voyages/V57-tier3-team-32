import { Card, CardContent } from "./components/ui/card";

function CurrentDate() {
  const currentDate = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

export default function PRReviewHeader() {
  return (
    <div className="w-full  top-0  bg-white  border-slate-200 p-3">
      <Card className="rounded-2xl  border border-0 outline outline-gray-400 ">
        <CardContent className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-3">
          <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-slate-900 ">
            PR Review Status Board
          </h2>
          <span className="text-xs sm:text-sm lg:text-base text-slate-500">
            {CurrentDate()}
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
