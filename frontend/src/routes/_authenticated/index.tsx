import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";

import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

import { api } from "@/lib/api";

async function getTotalSpent() {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data;
}

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  const totalSpent = parseInt(data?.total || "0");

  const formattedAmount = totalSpent.toLocaleString('id-ID');
  

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div className="flex flex-col py-6">
        <div className="text-sm text-[#B2B2B2]">Net Total</div>
        <div className="text-3xl font-semibold">
          {isPending ? <Skeleton className="h-6 animate-pulse" /> : (

            <span className="relative">{formattedAmount},00<span className="text-sm font-normal text-[#B2B2B2] absolute right-[-22px] top-[-5px]">Rp</span></span>
          )}
        </div>
      </div>

      {/* <div className="flex">
        <div className="flex flex-col mr-[50px]">
          <div className="flex items-center text-sm font-semibold text-[#49AF60]"><ArrowUpRight />Income</div>
          <div className="text-2xl font-semibold">
            {isPending ? <Skeleton className="h-6 animate-pulse" /> : (

              <span className="relative">135.780,00<span className="text-sm font-normal text-[#B2B2B2] absolute right-[-22px] top-[-5px]">Rp</span></span>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center text-sm font-semibold text-[#D15442]"><ArrowDownLeft />Expenses</div>
          <div className="text-2xl font-semibold">
            {isPending ? <Skeleton className="h-6 animate-pulse" /> : (

              <span className="relative">135.780,00<span className="text-sm font-normal text-[#B2B2B2] absolute right-[-22px] top-[-5px]">Rp</span></span>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}
