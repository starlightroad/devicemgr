import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

import { deviceGroupsTable, deviceStatusesTable, deviceTypesTable, usersTable } from "@/db/schemas";

export const devicesTable = pgTable("devices", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  typeId: text("type_id")
    .notNull()
    .references(() => deviceTypesTable.id),
  statusId: text("status_id")
    .notNull()
    .references(() => deviceStatusesTable.id),
  groupId: text("group_id")
    .notNull()
    .references(() => deviceGroupsTable.id),
  name: varchar("name", { length: 255 }).notNull(),
  serialNumber: varchar("serial_number", { length: 64 }).notNull(),
  ipAddress: varchar("ip_address", { length: 15 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
