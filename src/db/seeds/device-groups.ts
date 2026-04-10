import "@/lib/config/env";

import { eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import deviceGroupsJSON from "@/lib/data/device-groups.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceGroupsTable, usersTable } from "@/db/schemas";

const deviceGroupsSeed = async (db: Database) => {
  try {
    const insertedDeviceGroups = await Promise.all(
      deviceGroupsJSON.map(async (deviceGroup) => {
        const guestUserEmail = usersJSON[0].email;

        const data = await db
          .select({ id: usersTable.id })
          .from(usersTable)
          .where(eq(usersTable.email, guestUserEmail));

        return db
          .insert(deviceGroupsTable)
          .values({ id: generateId(), userId: data[0].id, name: deviceGroup.name })
          .returning({ id: deviceGroupsTable.id });
      }),
    );

    const deviceGroupsCount = insertedDeviceGroups.length;

    console.info(`✅ Seeded ${deviceGroupsCount} device group${deviceGroupsCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed device groups:", error);
  }
};

export default deviceGroupsSeed;
