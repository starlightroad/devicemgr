"use server";

import { count, eq } from "drizzle-orm";

import { db } from "@/db/client";

import { devicesTable } from "@/db/schemas";

import { getSession } from "@/dal/session";

export const getDevicesCount = async () => {
  try {
    const session = await getSession();

    const data = await db.select({ count: count() }).from(devicesTable).where(eq(devicesTable.userId, session.userId));

    return data[0].count;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get devices count.");
  }
};
