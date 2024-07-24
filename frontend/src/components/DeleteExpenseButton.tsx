import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllExpensesQueryOptions, deleteExpense } from "@/lib/api";

import { Trash } from "lucide-react"

import { ReloadIcon } from "@radix-ui/react-icons"
import {
  Button
} from "@/components/ui/button";
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
          <Button variant="outline" disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button 
          disabled={deleteExpenseMutation.isPending}
          onClick={() => deleteExpenseMutation.mutate({ id })}
          variant="destructive" 
          size="icon"
          >
            <Trash className="h-4 w-4" strokeWidth={3} />
          </Button>
        )
      }
    </>
  );
}

export default DeleteExpenseButton