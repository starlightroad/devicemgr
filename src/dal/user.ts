import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";

import { usersTable } from "@/db/schemas";

import { getSession } from "@/dal/session";

export const getUser = async () => {
  const session = await getSession();

  try {
    const data = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
    const user = data[0];

    return user;
  } catch {
    console.error("Failed to get user.");
    return null;
  }
};

export const getUserNameAndEmail = async () => {
  const user = await getUser();

  if (!user) return null;

  return {
    name: user.name,
    email: user.email,
  };
};
