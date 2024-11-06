CREATE TYPE "public"."accountType" AS ENUM('personalCheckingAccounts', 'personalSavingsAccounts', 'businessAccounts');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'closed');--> statement-breakpoint
CREATE TYPE "public"."transactionStatus" AS ENUM('success', 'pending', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."transactionType" AS ENUM('fund', 'transfer');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "businessAccount" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"number" varchar(20) NOT NULL,
	"balance" numeric(19, 2) DEFAULT '0' NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"businessName" varchar(255) NOT NULL,
	"businessType" varchar(50) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "businessAccount_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personalCheckingAccount" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"number" varchar(20) NOT NULL,
	"balance" numeric(19, 2) DEFAULT '0' NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"limit" numeric(19, 2) DEFAULT '0',
	"date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "personalCheckingAccount_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "personalSavingsAccount" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"number" varchar(20) NOT NULL,
	"balance" numeric(19, 2) DEFAULT '0' NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"interestRate" numeric(5, 2) NOT NULL,
	"withdrawalLimit" integer DEFAULT 3 NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "personalSavingsAccount_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"amount" numeric(19, 2) DEFAULT '0' NOT NULL,
	"type" "transactionType" NOT NULL,
	"status" "transactionStatus" DEFAULT 'pending' NOT NULL,
	"account" "accountType" DEFAULT 'personalCheckingAccounts' NOT NULL,
	"accountId" uuid NOT NULL,
	"description" varchar(255),
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"ipCountry" text,
	"username" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	"balance" numeric(19, 2) DEFAULT '0' NOT NULL,
	"password" text,
	"country" varchar(255),
	"status" "status" DEFAULT 'active' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "businessAccount" ADD CONSTRAINT "businessAccount_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personalCheckingAccount" ADD CONSTRAINT "personalCheckingAccount_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personalSavingsAccount" ADD CONSTRAINT "personalSavingsAccount_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_userId_index" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "businessAccount_number_index" ON "businessAccount" USING btree ("number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "personalCheckingAccount_number_index" ON "personalCheckingAccount" USING btree ("number");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "personalSavingsAccount_number_index" ON "personalSavingsAccount" USING btree ("number");