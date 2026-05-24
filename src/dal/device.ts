import "server-only";

import { and, count, eq, ilike, sql } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import { MAX_ROWS } from "@/lib/constants";

import type { ActionResult, Options } from "@/lib/definitions";

import type { Device } from "@/features/device/lib/definitions";

import { getSqlOrderByStatementBySort, getSqlWhereStatementByFilters } from "@/features/device/lib/helpers";

import { deviceGroupsTable, devicesTable, deviceStatusesTable, deviceTypesTable, usersTable } from "@/db/schemas";

export const getDevicesCount = async (): Promise<ActionResult<number>> => {
  const session = await getSession();

  try {
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
  const session = await getSession();

  try {
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

export const getDevices = async (options: Options): Promise<ActionResult<Device[]>> => {
  const session = await getSession();

  try {
    const data = await db
      .select({
        id: devicesTable.id,
        typeId: devicesTable.typeId,
        statusId: devicesTable.statusId,
        groupId: devicesTable.groupId,
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
      .where(sql`${devicesTable.userId} = ${session.userId} ${getSqlWhereStatementByFilters(options.filters)}`)
      .orderBy(getSqlOrderByStatementBySort(options.sort))
      .offset(options.pagination?.offset ?? 0)
      .limit(options.pagination?.limit ?? MAX_ROWS);

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

export const getDevicesPages = async (options: Pick<Options, "pagination" | "filters">) => {
  const { pagination, filters } = options;

  const session = await getSession();

  try {
    const data = await db
      .select({ count: count() })
      .from(devicesTable)
      .innerJoin(deviceTypesTable, eq(devicesTable.typeId, deviceTypesTable.id))
      .innerJoin(deviceStatusesTable, eq(devicesTable.statusId, deviceStatusesTable.id))
      .innerJoin(deviceGroupsTable, eq(devicesTable.groupId, deviceGroupsTable.id))
      .where(sql`${devicesTable.userId} = ${session.userId} ${getSqlWhereStatementByFilters(filters)}`);

    const totalPages = Math.ceil(data[0].count / (Number(pagination?.limit) || MAX_ROWS));

    return {
      data: totalPages,
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Failed to load data.",
    };
  }
};

export const getDeviceById = async (deviceId: string) => {
  const session = await getSession();

  try {
    const data = await db
      .select({
        id: devicesTable.id,
        typeId: devicesTable.typeId,
        statusId: devicesTable.statusId,
        groupId: devicesTable.groupId,
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
      .where(and(eq(devicesTable.userId, session.userId), eq(devicesTable.id, deviceId.toLowerCase())));

    if (!data.length) throw new Error();

    return {
      data: data[0],
      error: null,
    };
  } catch {
    return {
      data: null,
      error: "Failed to get device.",
    };
  }
};
