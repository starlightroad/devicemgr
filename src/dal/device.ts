import "server-only";

import { count, desc, eq, ilike } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import { MAX_ROWS } from "@/lib/constants";

import type { ActionResult } from "@/lib/definitions";

import type { Device } from "@/features/device/lib/definitions";

import { deviceGroupsTable, devicesTable, deviceStatusesTable, deviceTypesTable, usersTable } from "@/db/schemas";

export const getDevicesCount = async (): Promise<ActionResult<number>> => {
  try {
    const session = await getSession();

    const data = await db.select({ count: count() }).from(devicesTable).where(eq(devicesTable.userId, session.userId));

    return {
      data: data[0].count,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Failed to load data.",
    };
  }
};

export const getDevicesCountByStatus = async (status: string): Promise<ActionResult<number>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({ count: count() })
      .from(devicesTable)
      .leftJoin(usersTable, eq(devicesTable.userId, session.userId))
      .leftJoin(deviceStatusesTable, eq(devicesTable.statusId, deviceStatusesTable.id))
      .where(ilike(deviceStatusesTable.name, status));

    return {
      data: data[0].count,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Failed to load data.",
    };
  }
};

export const getDevices = async (limit?: number): Promise<ActionResult<Device[]>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({
        id: devicesTable.id,
        type: deviceTypesTable.name,
        status: deviceStatusesTable.name,
        group: deviceGroupsTable.name,
        name: devicesTable.name,
        serialNumber: devicesTable.serialNumber,
        ipAddress: devicesTable.ipAddress,
      })
      .from(devicesTable)
      .innerJoin(deviceTypesTable, eq(devicesTable.typeId, deviceTypesTable.id))
      .innerJoin(deviceStatusesTable, eq(devicesTable.statusId, deviceStatusesTable.id))
      .innerJoin(deviceGroupsTable, eq(devicesTable.groupId, deviceGroupsTable.id))
      .where(eq(devicesTable.userId, session.userId))
      .orderBy(desc(devicesTable.createdAt))
      .limit(limit ?? MAX_ROWS);

    return {
      data,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Failed to load data.",
    };
  }
};
