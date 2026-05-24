import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "./session";

import { accountsTable } from "@/db/schemas";

const getAccount = async () => {
  const session = await getSession();

  try {
    const data = await db.select().from(accountsTable).where(eq(accountsTable.userId, session.userId));
    const account = data[0];

    return account;
  } catch {
    console.error("Failed to get account.");
    return null;
  }
};

export const getAccountUpdatedDate = async () => {
  const data = await getAccount();

  if (!data) return null;

  return data.updatedAt;
};
