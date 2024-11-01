ALTER TABLE "job_postings" DROP CONSTRAINT "job_postings_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posting_applicants" DROP CONSTRAINT "posting_applicants_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posting_applicants" DROP CONSTRAINT "posting_applicants_job_id_job_postings_id_fk";
--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN "owner" uuid;--> statement-breakpoint
ALTER TABLE "posting_applicants" ADD COLUMN "candidate_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "posting_applicants" ADD COLUMN "posting_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "posting_applicants" ADD COLUMN "status" integer DEFAULT -1;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "top5_skills_csv" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_owner_users_id_fk" FOREIGN KEY ("owner") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_candidate_id_users_id_fk" FOREIGN KEY ("candidate_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_posting_id_job_postings_id_fk" FOREIGN KEY ("posting_id") REFERENCES "public"."job_postings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "job_postings" DROP COLUMN IF EXISTS "owner_id";--> statement-breakpoint
ALTER TABLE "posting_applicants" DROP COLUMN IF EXISTS "owner_id";--> statement-breakpoint
ALTER TABLE "posting_applicants" DROP COLUMN IF EXISTS "job_id";--> statement-breakpoint
ALTER TABLE "posting_applicants" DROP COLUMN IF EXISTS "status_id";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "top_5_skills_csv";