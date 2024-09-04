CREATE TABLE IF NOT EXISTS "posting_applicants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"owner_id" uuid,
	"job_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_job_id_job_postings_id_fk" FOREIGN KEY ("job_id") REFERENCES "job_postings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
