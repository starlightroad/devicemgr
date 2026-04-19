"use server";

import { asc, eq } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import type { ActionResult } from "@/lib/definitions";

import { deviceTypesTable, usersTable } from "@/db/schemas";

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
