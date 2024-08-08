CREATE TABLE IF NOT EXISTS "MockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"jobDesc" varchar NOT NULL,
	"done" boolean DEFAULT false NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"price" real NOT NULL,
	"coins" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"planId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StripeCustomer" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"stripeCustomerId" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "StripeCustomer_stripeCustomerId_unique" UNIQUE("stripeCustomerId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar NOT NULL,
	"userId" varchar NOT NULL,
	"question" varchar NOT NULL,
	"correctAns" text NOT NULL,
	"userAns" text,
	"feedback" text NOT NULL,
	"rating" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserCoins" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"numberOfCoins" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "MockInterview" ADD CONSTRAINT "MockInterview_createdBy_User_userId_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_userId_User_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Purchases" ADD CONSTRAINT "Purchases_planId_Plan_id_fk" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_userId_User_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userId_User_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserCoins" ADD CONSTRAINT "UserCoins_userId_User_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
