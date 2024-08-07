import { hc } from "hono/client";
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { type CreateExpense } from "@server/sharedTypes";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export async function fetchCurrentUser() {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await res.json();
  return data;
}

export async function fetchAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch all expenses");
  }
  const data = await res.json();
  return data;
}

export async function createExpense({ value: expenseData }: { value: CreateExpense }) {
  const res = await api.expenses.$post({ json: expenseData });
  if (!res.ok) {
    throw new Error("Failed to create expense");
  }
  const newExpense = await res.json();
  return newExpense;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: fetchCurrentUser,
  staleTime: Infinity
})

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: fetchAllExpenses,
  staleTime: 1000 * 60 * 5
})

export async function deleteExpense({ id }: {id: number}) {
  const res = await api.expenses[":id{[0-9]+}"].$delete({param: { id: id.toString() } });

  if (!res.ok) {
    throw new Error("Failed to delete expense");
  }
}
