import { Link} from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";
import { getAllExpensesQueryOptions } from "@/lib/api";

import { Skeleton } from "@/components/ui/skeleton";
import { formattedDate } from "@/lib/date";


const RecentExpenses = () => {
  const { isLoading, error, data } = useQuery(getAllExpensesQueryOptions);

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  return (
    <div className="w-full mx-auto mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Expenses</h2>
        <Link to="/expenses" className="text-sm text-zinc-500">See all</Link>
      </div>
      <ul className="mt-6">
        {isLoading 
          ? Array(5).fill(0).map((_, index) => (
            <li key={index} className="p-4 rounded-lg">
              <div><Skeleton className="h-6 animate-pulse" /></div>
              <div><Skeleton className="h-6 animate-pulse" /></div>
              <div><Skeleton className="h-6 animate-pulse" /></div>
            </li>
          ))
          : data?.expenses.slice(0, 5).map((expense) => (
            <li key={expense.id} className="flex justify-between items-center border p-4 rounded-lg mb-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-md font-semibold">{expense.title}</h3>
                <p className="text-sm text-gray-500">{formattedDate(expense.date)}</p>
              </div>
              <p className="font-semibold">Rp{expense.amount}</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default RecentExpenses