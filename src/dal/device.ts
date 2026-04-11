"use server";

import { count, eq, ilike } from "drizzle-orm";

import { db } from "@/db/client";

import type { ActionResult } from "@/lib/definitions";

import { devicesTable, deviceStatusesTable, usersTable } from "@/db/schemas";

import { getSession } from "@/dal/session";

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

export const getDevicesInUseCount = async (): Promise<ActionResult<number>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({ count: count() })
      .from(devicesTable)
      .leftJoin(usersTable, eq(devicesTable.userId, session.userId))
      .leftJoin(deviceStatusesTable, eq(devicesTable.statusId, deviceStatusesTable.id))
      .where(ilike(deviceStatusesTable.name, "in use"));

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
