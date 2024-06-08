import { serial, text, numeric, index, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable("expenses", {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  title: text("title").notNull(),
  amount: numeric("amount", {precision: 12, scale: 2}).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (expenses) => {
  return {
    userIdIndex: index('name_idx').on(expenses.userId),
  }
});

// Schema for inserting a user - can be used to validate API requests
export const insertExpensesSchema = createInsertSchema(expenses, {
  title: z.string()
  .min(3, { message: "Title must be at least 3 characters" }),
  amount: z.string().regex(/^\d+$/, { message: "Amount must be a positive number and no more than 2 decimal places" }),
});
// Schema for selecting a user - can be used to validate API responses
export const selectExpensesSchema = createSelectSchema(expenses);