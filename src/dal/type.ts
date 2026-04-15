"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";

import type { ActionResult } from "@/lib/definitions";

import { deviceTypesTable, usersTable } from "@/db/schemas";

import { getSession } from "@/dal/session";

export const getDeviceTypes = async (): Promise<ActionResult<Array<{ id: string; name: string }>>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({
        id: deviceTypesTable.id,
        name: deviceTypesTable.name,
      })
      .from(deviceTypesTable)
      .innerJoin(usersTable, eq(deviceTypesTable.userId, session.userId));

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
