CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint
CREATE TYPE "public"."content_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('video', 'article', 'podcast', 'design');--> statement-breakpoint
CREATE TYPE "public"."platform_name" AS ENUM('tiktok', 'instagram', 'youtube');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('owner', 'editor', 'viewer');--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"action" text NOT NULL,
	"entity_type" text,
	"entity_id" uuid,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"type" "content_type" NOT NULL,
	"description" text,
	"thumbnail_url" text,
	"platform" "platform_name",
	"external_url" text,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"personal_rating" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"published_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "content_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	CONSTRAINT "content_metadata_content_item_id_unique" UNIQUE("content_item_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role" DEFAULT 'viewer' NOT NULL,
	"invited_by" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "platforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "platform_name" NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"token_expires_at" timestamp with time zone,
	"last_synced_at" timestamp with time zone,
	"sync_enabled" boolean DEFAULT true NOT NULL,
	CONSTRAINT "platforms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "aggregate_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metric_type" text NOT NULL,
	"value" double precision NOT NULL,
	"dimension" text,
	"dimension_value" text,
	"calculated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content_item_id" uuid NOT NULL,
	"platform" "platform_name" NOT NULL,
	"views" bigint DEFAULT 0 NOT NULL,
	"likes" bigint DEFAULT 0 NOT NULL,
	"comments" bigint DEFAULT 0 NOT NULL,
	"shares" bigint DEFAULT 0 NOT NULL,
	"fetched_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"modules" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_draft" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_by" uuid
);
--> statement-breakpoint
CREATE TABLE "public_metrics_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metric_key" text NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"display_label" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "public_metrics_config_metric_key_unique" UNIQUE("metric_key")
);
--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_metadata" ADD CONSTRAINT "content_metadata_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "platform_metrics" ADD CONSTRAINT "platform_metrics_content_item_id_content_items_id_fk" FOREIGN KEY ("content_item_id") REFERENCES "public"."content_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_config" ADD CONSTRAINT "portfolio_config_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "content_items_status_idx" ON "content_items" USING btree ("status");--> statement-breakpoint
CREATE INDEX "content_items_type_idx" ON "content_items" USING btree ("type");--> statement-breakpoint
CREATE INDEX "content_items_search_idx" ON "content_items" USING gin (("title" || ' ' || coalesce("description", '')) gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "aggregate_metrics_type_idx" ON "aggregate_metrics" USING btree ("metric_type");--> statement-breakpoint
CREATE INDEX "aggregate_metrics_calculated_at_idx" ON "aggregate_metrics" USING btree ("calculated_at");--> statement-breakpoint
CREATE INDEX "platform_metrics_content_item_idx" ON "platform_metrics" USING btree ("content_item_id");--> statement-breakpoint
CREATE INDEX "platform_metrics_fetched_at_idx" ON "platform_metrics" USING btree ("fetched_at");