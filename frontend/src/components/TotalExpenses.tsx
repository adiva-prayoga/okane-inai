import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
}

const TotalExpenses = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  const totalSpentAmount = parseInt(data?.total || "0");
  const formattedTotalSpent = totalSpentAmount.toLocaleString('id-ID');

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <div className="mt-6">
      <div className="text-sm text-gray-500">Total Expenses</div>
      <div className="text-3xl font-semibold">
        {isPending ? (
          <Skeleton className="h-6 animate-pulse" />
        ) : (
          <span className="relative">
            {formattedTotalSpent},00
            <span className="text-sm font-normal text-gray-500 absolute right-[-22px] top-[-5px]">Rp</span>
          </span>
        )}
      </div>
    </div>
  )
}

export default TotalExpenses

