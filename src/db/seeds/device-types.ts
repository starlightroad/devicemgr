import "@/lib/config/env";

import { eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import deviceTypesJSON from "@/lib/data/device-types.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceTypesTable, usersTable } from "@/db/schemas";

const deviceTypesSeed = async (db: Database) => {
  try {
    const insertedDeviceTypes = await Promise.all(
      deviceTypesJSON.map(async (deviceType) => {
        const guestUserEmail = usersJSON[0].email;

        const data = await db
          .select({ id: usersTable.id })
          .from(usersTable)
          .where(eq(usersTable.email, guestUserEmail));

        return db
          .insert(deviceTypesTable)
          .values({ id: generateId(), userId: data[0].id, name: deviceType.name })
          .returning({ id: deviceTypesTable.id });
      }),
    );

    const deviceTypesCount = insertedDeviceTypes.length;

    console.info(`✅ Seeded ${deviceTypesCount} device type${deviceTypesCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed device types:", error);
  }
};

export default deviceTypesSeed;
