import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllExpensesQueryOptions, loadingCreateExpenseQueryOptions, deleteExpense } from "@/lib/api";

import { Trash } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Button
} from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/expenses")({
  component: Expenses,
});

function Expenses() {
  const { isPending, error, data } = useQuery(getAllExpensesQueryOptions);
  const { data: loadingCreateExpense } = useQuery(loadingCreateExpenseQueryOptions)

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="p-2 max-w-3xl m-auto">
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
                    <ExpenseDeleteButton id={expense.id} />
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ExpenseDeleteButton({ id } : {id: number}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error", {
        description: `Failed to delete expense ${id}`,
      })
    },
    onSuccess: () => {
      toast("Expense Deleted", {
        description: `Expense ${id} deleted successfully`,
      })
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existisExpenses) => ({
        ...existisExpenses,
        expenses: existisExpenses!.expenses.filter((expense) => expense.id !== id),
      }))
    }
  })

  return (
    <Button 
      disabled={mutation.isPending}
      onClick={() => mutation.mutate({id})}
      variant="outline" 
      size="icon"
    >
      {mutation.isPending ? "..." : <Trash className="h-4 w-4" />}
    </Button>
  )
}
