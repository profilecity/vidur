ALTER TABLE "job_postings" ADD COLUMN "is_expired" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN "valid_till" date;