CREATE TABLE IF NOT EXISTS "metadata_entries" (
	"key" varchar(48) PRIMARY KEY NOT NULL,
	"value" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
