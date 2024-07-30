import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllExpensesQueryOptions, deleteExpense } from "@/lib/api";

import { Trash } from "lucide-react"

import { ReloadIcon } from "@radix-ui/react-icons"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";

const DeleteExpenseButton = ({ id, title }: { id: number; title: string }) => {
  const queryClient = useQueryClient();
  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast("Error", {
        description: `Failed to delete expense ${id}`,
      });
    },
    onSuccess: () => {
      toast("Expense Deleted", {
        description: `Expense ${title} deleted successfully`,
      });
      queryClient.setQueryData(
        getAllExpensesQueryOptions.queryKey,
        (existingExpenses) => ({
          ...existingExpenses,
          expenses: existingExpenses!.expenses.filter((expense) => expense.id !== id),
        })
      );
    }
  });

  return (
    <>
      {
        deleteExpenseMutation.isPending ? (
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => deleteExpenseMutation.mutate({ id })}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        )
      }
    </>
  );
}

export default DeleteExpenseButton