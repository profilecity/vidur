CREATE TABLE IF NOT EXISTS "hooks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"url" varchar(255) NOT NULL,
	"prefs" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
