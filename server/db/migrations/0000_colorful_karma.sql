CREATE TABLE IF NOT EXISTS "hooks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(40) NOT NULL,
	"url" varchar(255) NOT NULL,
	"prefs" integer DEFAULT 0 NOT NULL,
	"last_executed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_postings" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"contents" text,
	"tags_csv" text,
	"owner_id" uuid,
	"is_published" boolean DEFAULT false NOT NULL,
	"total_applicants" integer DEFAULT 0 NOT NULL,
	"is_expired" boolean DEFAULT false NOT NULL,
	"valid_till" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "metadata_entries" (
	"key" varchar(48) PRIMARY KEY NOT NULL,
	"value" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posting_applicants" (
	"id" uuid PRIMARY KEY NOT NULL,
	"owner_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"status_id" integer DEFAULT -1,
	"status_type" smallint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review_tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(32) NOT NULL,
	"parent" smallint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50),
	"picture" text,
	"email" varchar(255) NOT NULL,
	"password" char(133) NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"permission" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_postings" ADD CONSTRAINT "job_postings_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posting_applicants" ADD CONSTRAINT "posting_applicants_job_id_job_postings_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."job_postings"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
