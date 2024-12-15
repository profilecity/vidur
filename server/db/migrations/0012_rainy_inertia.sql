CREATE TABLE IF NOT EXISTS "admins" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50),
	"picture" text,
	"email" varchar(255) NOT NULL,
	"password" char(133) NOT NULL,
	"permission" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DROP TABLE "user_handles";--> statement-breakpoint
ALTER TABLE "job_postings" DROP CONSTRAINT "job_postings_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" char(133) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_owner_id_admins_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."admins"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "permission";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "top_5_skills_csv";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "is_admin";