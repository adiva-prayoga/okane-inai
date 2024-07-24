import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions } from "@/lib/api";

import { formattedDate } from "@/lib/date";

import DeleteExpenseButton from "@/components/DeleteExpenseButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions)

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="p-2 max-w-3xl m-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Expense</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingCreateExpense?.expense && (
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-6 animate-pulse" />
            </TableCell>
            <TableCell>{loadingCreateExpense?.expense.title}</TableCell>
            <TableCell>{loadingCreateExpense?.expense.amount}</TableCell>
            <TableCell>{formattedDate(loadingCreateExpense?.expense.date)}</TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-6 animate-pulse" />
            </TableCell>
          </TableRow>
          )}
          {isPending
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-6 animate-pulse" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Skeleton className="h-6 animate-pulse" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Skeleton className="h-6 animate-pulse" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Skeleton className="h-6 animate-pulse" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Skeleton className="h-6 animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
            : data?.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>Rp {expense.amount}</TableCell>
                  <TableCell>{formattedDate(expense.date)}</TableCell>
                  <TableCell>
                    <DeleteExpenseButton id={expense.id} title={expense.title} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </section>
  );
}
