import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import type { ActionResult } from "@/lib/definitions";

import { deviceStatusesTable, usersTable } from "@/db/schemas";

export const getDeviceStatuses = async (): Promise<ActionResult<Array<{ id: string; name: string }>>> => {
  try {
    const session = await getSession();

    const data = await db
      .select({
        id: deviceStatusesTable.id,
        name: deviceStatusesTable.name,
      })
      .from(deviceStatusesTable)
      .innerJoin(usersTable, eq(deviceStatusesTable.userId, session.userId));

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
