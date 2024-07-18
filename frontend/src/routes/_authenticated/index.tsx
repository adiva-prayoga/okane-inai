import ExpensesTotal from "@/components/ExpensesTotal";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex items-center justify-center">
      <ExpensesTotal />
    </div>
  );
}
