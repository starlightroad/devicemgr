import { loadEnvConfig } from "@next/env";

import { usersTable } from "@/db/schemas";

import type { Database } from "@/db/client";

import usersJSON from "@/lib/data/users.json";

loadEnvConfig(process.cwd());

const usersSeed = async (db: Database) => {
  try {
    const insertedUsers = await Promise.all(
      usersJSON.map(async (user) => {
        return await db.insert(usersTable).values(user).returning();
      }),
    );

    const usersCount = insertedUsers.length;

    console.info(`✅ Seeded ${usersCount} user${usersCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed users:", error);
  }
};

export default usersSeed;
