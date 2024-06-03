import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  const { isPending, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) return "An error has occurred: " + error.message;
  return (
    <Card className="w-80 m-auto text-left">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent className="text-3xl">
        {isPending ? <Skeleton className="h-6 animate-pulse" /> : data.total}
      </CardContent>
    </Card>
  );
}
