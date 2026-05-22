ALTER TABLE "platforms" ADD COLUMN "account_id" text;--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "account_name" text;--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "scopes" text[];--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "last_sync_status" text;--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "last_sync_error" text;--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "connected_at" timestamp with time zone DEFAULT now();--> statement-breakpoint
ALTER TABLE "platforms" ADD COLUMN "connected_by" uuid;--> statement-breakpoint
ALTER TABLE "platform_metrics" ADD COLUMN "saves" bigint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "platform_metrics" ADD COLUMN "reach" bigint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "platform_metrics" ADD COLUMN "impressions" bigint DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "platform_metrics" ADD COLUMN "raw_data" jsonb;--> statement-breakpoint
ALTER TABLE "platforms" ADD CONSTRAINT "platforms_connected_by_users_id_fk" FOREIGN KEY ("connected_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;