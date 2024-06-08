ALTER TABLE "expenses" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "date" date NOT NULL;