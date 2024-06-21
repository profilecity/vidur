ALTER TABLE "hooks" ADD COLUMN "title" varchar(40) NOT NULL;--> statement-breakpoint
ALTER TABLE "hooks" ADD COLUMN "last_executed_at" timestamp;
ALTER TABLE "hooks" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;