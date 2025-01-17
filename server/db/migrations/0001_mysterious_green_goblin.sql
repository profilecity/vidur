DO $$ BEGIN
 CREATE TYPE "public"."employment_type" AS ENUM('FULL_TIME', 'PART_TIME', 'CONTRACTOR', 'INTERN', 'VOLUNTEER', 'PER_DIEM', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN "employment_type" "employment_type" DEFAULT 'FULL_TIME' NOT NULL;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN "job_locations" json;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN "is_remote" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "job_postings" ADD COLUMN "base_salary" json;