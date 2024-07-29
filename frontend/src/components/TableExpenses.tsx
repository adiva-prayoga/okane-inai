/* eslint-disable @typescript-eslint/no-explicit-any */
import { formattedDate } from "@/lib/date";

import DeleteExpenseButton from "@/components/DeleteExpenseButton";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Expenses = {
  date: string;
  id: number;
  userId: string;
  title: string;
  amount: string;
  createdAt: string | null;
}

interface TableExpensesProps {
  currentExpenses: Expenses[]
  loadingCreateExpense?: { expense: Expenses }
  isPending: boolean
}

const TableExpenses = ({ currentExpenses, loadingCreateExpense, isPending } : TableExpensesProps) => {
  return (
    <Table className="mb-6">
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
          : currentExpenses.map((expense) => (
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
  )
}

export default TableExpenses