import "server-only";

import { asc, count, eq } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import type { ActionResult } from "@/lib/definitions";

import { devicesTable, deviceTypesTable, usersTable } from "@/db/schemas";

export const getDeviceTypes = async (): Promise<ActionResult<Array<{ id: string; name: string }>>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({
        id: deviceTypesTable.id,
        name: deviceTypesTable.name,
      })
      .from(deviceTypesTable)
      .innerJoin(usersTable, eq(deviceTypesTable.userId, session.userId))
      .orderBy(asc(deviceTypesTable.name));

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

export const getDeviceCountsByType = async (): Promise<ActionResult<Array<{ name: string; total: number }>>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({
        name: deviceTypesTable.name,
        total: count(),
      })
      .from(deviceTypesTable)
      .innerJoin(devicesTable, eq(devicesTable.typeId, deviceTypesTable.id))
      .where(eq(deviceTypesTable.userId, session.userId))
      .groupBy(deviceTypesTable.name)
      .orderBy(asc(deviceTypesTable.name));

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
