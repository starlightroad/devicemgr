import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "./session";

import { accountsTable } from "@/db/schemas";

const getAccount = async () => {
  try {
    const session = await getSession();

    const data = await db.select().from(accountsTable).where(eq(accountsTable.userId, session.userId));
    const account = data[0];

    return account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get account.");
  }
};

export const getAccountUpdatedDate = async () => {
  try {
    const data = await getAccount();

    return data.updatedAt;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get account updated date.");
  }
};
