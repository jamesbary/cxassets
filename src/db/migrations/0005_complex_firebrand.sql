ALTER TABLE "user" ALTER COLUMN "pin" SET DATA TYPE varchar(6);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hashedPin" text;