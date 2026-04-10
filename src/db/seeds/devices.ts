import "@/lib/config/env";

import { and, eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import devicesJSON from "@/lib/data/devices.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceGroupsTable, devicesTable, deviceStatusesTable, deviceTypesTable, usersTable } from "@/db/schemas";

const devicesSeed = async (db: Database) => {
  try {
    const guestUserEmail = usersJSON[0].email;
    const data = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, guestUserEmail));
    const userId = data[0].id;

    const getDeviceTypeData = async (columnName: string) =>
      db
        .select({ id: deviceTypesTable.id })
        .from(deviceTypesTable)
        .where(and(eq(deviceTypesTable.userId, userId), eq(deviceTypesTable.name, columnName)));

    const getDeviceStatusData = async (columnName: string) =>
      db
        .select({ id: deviceStatusesTable.id })
        .from(deviceStatusesTable)
        .where(and(eq(deviceStatusesTable.userId, userId), eq(deviceStatusesTable.name, columnName)));

    const getDeviceGroupData = async (columnName: string) =>
      db
        .select({ id: deviceGroupsTable.id })
        .from(deviceGroupsTable)
        .where(and(eq(deviceGroupsTable.userId, userId), eq(deviceGroupsTable.name, columnName)));

    const devicesValues = await Promise.all(
      devicesJSON.map(async (device) => {
        const [deviceTypeData, deviceStatusData, deviceGroupData] = await Promise.all([
          getDeviceTypeData(device.device_type),
          getDeviceStatusData(device.device_status),
          getDeviceGroupData(device.device_group),
        ]);

        return {
          id: generateId(),
          userId,
          typeId: deviceTypeData[0].id,
          statusId: deviceStatusData[0].id,
          groupId: deviceGroupData[0].id,
          name: device.name,
          serialNumber: device.serial_number,
          ipAddress: device.ip_address,
        };
      }),
    );

    const { rowCount } = await db.insert(devicesTable).values(devicesValues);

    console.info(`✅ Seeded ${rowCount} device${rowCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed devices:", error);
  }
};

export default devicesSeed;
