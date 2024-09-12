CREATE TABLE IF NOT EXISTS "review_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(8) NOT NULL,
	"parent" smallint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posting_applicants" DROP CONSTRAINT "posting_applicants_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "posting_applicants" ALTER COLUMN "owner_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posting_applicants" ALTER COLUMN "job_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
