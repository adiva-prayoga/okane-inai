import TotalExpenses from "@/components/TotalExpenses";
import RecentExpenses from "@/components/RecentExpenses";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <section className="flex flex-col items-center justify-center">
      <TotalExpenses />
      <RecentExpenses />
    </section>
  );
}
