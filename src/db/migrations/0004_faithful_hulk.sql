CREATE TABLE "devices" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type_id" text NOT NULL,
	"status_id" text NOT NULL,
	"group_id" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"serial_number" varchar(64) NOT NULL,
	"ip_address" varchar(15),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_type_id_device_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."device_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_status_id_device_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."device_statuses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_group_id_device_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."device_groups"("id") ON DELETE no action ON UPDATE no action;