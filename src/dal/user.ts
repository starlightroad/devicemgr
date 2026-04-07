"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db/client";

import { usersTable } from "@/db/schemas";

import { getSession } from "@/dal/session";

const getUser = async () => {
  try {
    const session = await getSession();

    const data = await db.select().from(usersTable).where(eq(usersTable.id, session.userId));
    const user = data[0];

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get user.");
  }
};

export const getUserNameAndEmail = async () => {
  try {
    const user = await getUser();

    return {
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get the user's name and email address.");
  }
};
