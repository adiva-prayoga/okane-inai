import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodValidator } from '@tanstack/zod-form-adapter'

import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

import { createExpense, getAllExpensesQueryOptions } from "@/lib/api";
import { cn } from "@/lib/utils";

import { createExpenseSchema } from "@server/sharedTypes";
import { CalendarIcon } from "lucide-react";

export const Route = createFileRoute("/_authenticated/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const existisExpenses = await queryClient.ensureQueryData(getAllExpensesQueryOptions)

      navigate({ to: "/expenses" });

      try {
        const newExpense = await createExpense({ value });
        // success state
        queryClient.setQueryData(getAllExpensesQueryOptions.queryKey, {
          ...existisExpenses,
          expenses: [newExpense, ...existisExpenses.expenses]
        })

        toast("Expense Created", {
          description: `Expense ${newExpense.title} created successfully`,
        })
      } catch (error) {
        // error state
        toast("Error", {
          description: "Failed to create new expense",
        })
      }
    },
  });

  return (
    <section>
      <form
        className="flex flex-col gap-y-4 max-w-xl m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="title"
          validators={{ 
            onChange: createExpenseSchema.shape.title
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Title</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Insert title"
                className="mb-2"
              />
              {field.state.meta.touchedErrors ? (
                <em className="text-red-500 text-sm">{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="amount"
          validators={{ 
            onChange: createExpenseSchema.shape.amount
          }}
          children={(field) => (
            <div>
              <Label htmlFor={field.name}>Amount</Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                type="number"
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Insert amount"
                className="mb-2"
              />
              {field.state.meta.touchedErrors ? (
                <em className="text-red-500 text-sm">{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />

        <form.Field
          name="date"
          validators={{ 
            onChange: createExpenseSchema.shape.date
          }}
          children={(field) => (
            <div className="flex self-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !field.state.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.state.value ? format(new Date(field.state.value), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={new Date(field.state.value)}
                    onSelect={(date) => field.handleChange((date ?? new Date()).toISOString())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
              ) : null}
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button className="mt-6" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Create Expense"}
            </Button>
          )}
        />
      </form>
    </section>
  );
}
