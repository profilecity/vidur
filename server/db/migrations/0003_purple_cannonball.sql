ALTER TABLE "job_postings" DROP CONSTRAINT "job_postings_owner_id_admins_id_fk";
--> statement-breakpoint
DROP TABLE "admins";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "permission" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
