CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp (3) with time zone DEFAULT now(),
	"updated_at" timestamp (3) with time zone DEFAULT now(),
	"state" smallint DEFAULT 0 NOT NULL,
	"stated_at" timestamp with time zone
);
