import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_technologies_display_group" AS ENUM('skills', 'platforms', 'databases', 'other');
  CREATE TYPE "public"."enum_posts_visibility" AS ENUM('public', 'unlisted', 'private');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_visibility" AS ENUM('public', 'unlisted', 'private');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_gear_items_category" AS ENUM('desk', 'homelab', 'development', 'audio', 'camera', 'fitness', 'edc', 'other');
  CREATE TABLE "work_experience_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "work_experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"time" varchar,
  	"link" varchar,
  	"logo_id" integer,
  	"sort_order" numeric DEFAULT 0,
  	"external_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"cover_image_id" integer,
  	"content" jsonb,
  	"visibility" "enum_posts_visibility" DEFAULT 'public',
  	"published_at" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"external_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"technologies_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_cover_image_id" integer,
  	"version_content" jsonb,
  	"version_visibility" "enum__posts_v_version_visibility" DEFAULT 'public',
  	"version_published_at" timestamp(3) with time zone,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_seo_image_id" integer,
  	"version_external_id" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"technologies_id" integer
  );
  
  CREATE TABLE "gear_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"category" "enum_gear_items_category" DEFAULT 'other' NOT NULL,
  	"affiliate_url" varchar,
  	"product_url" varchar,
  	"notes" varchar,
  	"owned" boolean DEFAULT true,
  	"recommended" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"external_id" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gear_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "site_settings_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar NOT NULL,
  	"default_title" varchar NOT NULL,
  	"title_template" varchar,
  	"default_description" varchar NOT NULL,
  	"site_url" varchar NOT NULL,
  	"contact_email" varchar,
  	"favicon_id" integer,
  	"default_og_image_id" integer,
  	"footer_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "profile_rotating_titles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "profile_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"icon" varchar,
  	"sort_order" numeric DEFAULT 0
  );
  
  CREATE TABLE "profile" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"headline" varchar,
  	"intro" varchar NOT NULL,
  	"profile_image_id" integer,
  	"resume_id" integer,
  	"email" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_strengths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'About Me' NOT NULL,
  	"intro" varchar DEFAULT 'Just a quick glimpse.',
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gear_page_intro_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar NOT NULL
  );
  
  CREATE TABLE "gear_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Gear' NOT NULL,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "work_experience_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "gear_items_id" integer;
  ALTER TABLE "technologies" ADD COLUMN "color_class" varchar;
  ALTER TABLE "technologies" ADD COLUMN "display_group" "enum_technologies_display_group" DEFAULT 'skills';
  ALTER TABLE "work_experience_responsibilities" ADD CONSTRAINT "work_experience_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."work_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "work_experience" ADD CONSTRAINT "work_experience_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_image_id_media_id_fk" FOREIGN KEY ("version_seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_technologies_fk" FOREIGN KEY ("technologies_id") REFERENCES "public"."technologies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gear_items" ADD CONSTRAINT "gear_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gear_items_rels" ADD CONSTRAINT "gear_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."gear_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gear_items_rels" ADD CONSTRAINT "gear_items_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_links" ADD CONSTRAINT "site_settings_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profile_rotating_titles" ADD CONSTRAINT "profile_rotating_titles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile_social_links" ADD CONSTRAINT "profile_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "profile" ADD CONSTRAINT "profile_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_paragraphs" ADD CONSTRAINT "about_page_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_strengths" ADD CONSTRAINT "about_page_strengths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gear_page_intro_lines" ADD CONSTRAINT "gear_page_intro_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gear_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gear_page" ADD CONSTRAINT "gear_page_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "work_experience_responsibilities_order_idx" ON "work_experience_responsibilities" USING btree ("_order");
  CREATE INDEX "work_experience_responsibilities_parent_id_idx" ON "work_experience_responsibilities" USING btree ("_parent_id");
  CREATE INDEX "work_experience_logo_idx" ON "work_experience" USING btree ("logo_id");
  CREATE UNIQUE INDEX "work_experience_external_id_idx" ON "work_experience" USING btree ("external_id");
  CREATE INDEX "work_experience_updated_at_idx" ON "work_experience" USING btree ("updated_at");
  CREATE INDEX "work_experience_created_at_idx" ON "work_experience" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_image_idx" ON "posts" USING btree ("cover_image_id");
  CREATE INDEX "posts_seo_seo_image_idx" ON "posts" USING btree ("seo_image_id");
  CREATE UNIQUE INDEX "posts_external_id_idx" ON "posts" USING btree ("external_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_technologies_id_idx" ON "posts_rels" USING btree ("technologies_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_cover_image_idx" ON "_posts_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_posts_v_version_seo_version_seo_image_idx" ON "_posts_v" USING btree ("version_seo_image_id");
  CREATE INDEX "_posts_v_version_version_external_id_idx" ON "_posts_v" USING btree ("version_external_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_technologies_id_idx" ON "_posts_v_rels" USING btree ("technologies_id");
  CREATE UNIQUE INDEX "gear_items_slug_idx" ON "gear_items" USING btree ("slug");
  CREATE INDEX "gear_items_image_idx" ON "gear_items" USING btree ("image_id");
  CREATE UNIQUE INDEX "gear_items_external_id_idx" ON "gear_items" USING btree ("external_id");
  CREATE INDEX "gear_items_updated_at_idx" ON "gear_items" USING btree ("updated_at");
  CREATE INDEX "gear_items_created_at_idx" ON "gear_items" USING btree ("created_at");
  CREATE INDEX "gear_items_rels_order_idx" ON "gear_items_rels" USING btree ("order");
  CREATE INDEX "gear_items_rels_parent_idx" ON "gear_items_rels" USING btree ("parent_id");
  CREATE INDEX "gear_items_rels_path_idx" ON "gear_items_rels" USING btree ("path");
  CREATE INDEX "gear_items_rels_categories_id_idx" ON "gear_items_rels" USING btree ("categories_id");
  CREATE INDEX "site_settings_nav_links_order_idx" ON "site_settings_nav_links" USING btree ("_order");
  CREATE INDEX "site_settings_nav_links_parent_id_idx" ON "site_settings_nav_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_default_og_image_idx" ON "site_settings" USING btree ("default_og_image_id");
  CREATE INDEX "profile_rotating_titles_order_idx" ON "profile_rotating_titles" USING btree ("_order");
  CREATE INDEX "profile_rotating_titles_parent_id_idx" ON "profile_rotating_titles" USING btree ("_parent_id");
  CREATE INDEX "profile_social_links_order_idx" ON "profile_social_links" USING btree ("_order");
  CREATE INDEX "profile_social_links_parent_id_idx" ON "profile_social_links" USING btree ("_parent_id");
  CREATE INDEX "profile_profile_image_idx" ON "profile" USING btree ("profile_image_id");
  CREATE INDEX "profile_resume_idx" ON "profile" USING btree ("resume_id");
  CREATE INDEX "about_page_paragraphs_order_idx" ON "about_page_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_paragraphs_parent_id_idx" ON "about_page_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_strengths_order_idx" ON "about_page_strengths" USING btree ("_order");
  CREATE INDEX "about_page_strengths_parent_id_idx" ON "about_page_strengths" USING btree ("_parent_id");
  CREATE INDEX "about_page_seo_seo_image_idx" ON "about_page" USING btree ("seo_image_id");
  CREATE INDEX "gear_page_intro_lines_order_idx" ON "gear_page_intro_lines" USING btree ("_order");
  CREATE INDEX "gear_page_intro_lines_parent_id_idx" ON "gear_page_intro_lines" USING btree ("_parent_id");
  CREATE INDEX "gear_page_seo_seo_image_idx" ON "gear_page" USING btree ("seo_image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_work_experience_fk" FOREIGN KEY ("work_experience_id") REFERENCES "public"."work_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gear_items_fk" FOREIGN KEY ("gear_items_id") REFERENCES "public"."gear_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_work_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("work_experience_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_gear_items_id_idx" ON "payload_locked_documents_rels" USING btree ("gear_items_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "work_experience_responsibilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "work_experience" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gear_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gear_items_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_nav_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profile_rotating_titles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profile_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "profile" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_strengths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gear_page_intro_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "gear_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "work_experience_responsibilities" CASCADE;
  DROP TABLE "work_experience" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "gear_items" CASCADE;
  DROP TABLE "gear_items_rels" CASCADE;
  DROP TABLE "site_settings_nav_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "profile_rotating_titles" CASCADE;
  DROP TABLE "profile_social_links" CASCADE;
  DROP TABLE "profile" CASCADE;
  DROP TABLE "about_page_paragraphs" CASCADE;
  DROP TABLE "about_page_strengths" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "gear_page_intro_lines" CASCADE;
  DROP TABLE "gear_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_work_experience_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_gear_items_fk";
  
  DROP INDEX "payload_locked_documents_rels_work_experience_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_gear_items_id_idx";
  ALTER TABLE "technologies" DROP COLUMN "color_class";
  ALTER TABLE "technologies" DROP COLUMN "display_group";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "work_experience_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "gear_items_id";
  DROP TYPE "public"."enum_technologies_display_group";
  DROP TYPE "public"."enum_posts_visibility";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_visibility";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_gear_items_category";`);
}
