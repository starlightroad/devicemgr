"use server";

import { asc, eq } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import type { ActionResult } from "@/lib/definitions";

import { deviceGroupsTable, usersTable } from "@/db/schemas";

export const getDeviceGroups = async (): Promise<ActionResult<Array<{ id: string; name: string }>>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({
        id: deviceGroupsTable.id,
        name: deviceGroupsTable.name,
      })
      .from(deviceGroupsTable)
      .innerJoin(usersTable, eq(deviceGroupsTable.userId, session.userId))
      .orderBy(asc(deviceGroupsTable.name));

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
