ALTER TABLE "posting_applicants" ADD COLUMN "status_id" integer DEFAULT -1;--> statement-breakpoint
ALTER TABLE "posting_applicants" ADD COLUMN "status_type" smallint DEFAULT 0;