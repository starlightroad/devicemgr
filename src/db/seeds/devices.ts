import "@/lib/config/env";

import { and, eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import devicesJSON from "@/lib/data/devices.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceGroupsTable, devicesTable, deviceStatusesTable, deviceTypesTable, usersTable } from "@/db/schemas";

const devicesSeed = async (db: Database) => {
  try {
    const insertedDevices = await Promise.all(
      devicesJSON.map(async (device) => {
        const guestUserEmail = usersJSON[0].email;

        const data = await db
          .select({ id: usersTable.id })
          .from(usersTable)
          .where(eq(usersTable.email, guestUserEmail));

        const userId = data[0].id;

        const deviceTypeData = await db
          .select({ id: deviceTypesTable.id })
          .from(deviceTypesTable)
          .where(and(eq(deviceTypesTable.userId, userId), eq(deviceTypesTable.name, device.device_type)));

        const deviceStatusData = await db
          .select({ id: deviceStatusesTable.id })
          .from(deviceStatusesTable)
          .where(and(eq(deviceStatusesTable.userId, userId), eq(deviceStatusesTable.name, device.device_status)));

        const deviceGroupData = await db
          .select({ id: deviceGroupsTable.id })
          .from(deviceGroupsTable)
          .where(and(eq(deviceGroupsTable.userId, userId), eq(deviceGroupsTable.name, device.device_group)));

        return db
          .insert(devicesTable)
          .values({
            id: generateId(),
            userId,
            typeId: deviceTypeData[0].id,
            statusId: deviceStatusData[0].id,
            groupId: deviceGroupData[0].id,
            name: device.name,
            serialNumber: device.serial_number,
            ipAddress: device.ip_address,
          })
          .returning({ id: devicesTable.id });
      }),
    );

    const devicesCount = insertedDevices.length;

    console.info(`✅ Seeded ${devicesCount} device${devicesCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed devices:", error);
  }
};

export default devicesSeed;
