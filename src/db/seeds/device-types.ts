import "@/lib/config/env";

import { eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import deviceTypesJSON from "@/lib/data/device-types.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceTypesTable, usersTable } from "@/db/schemas";

const deviceTypesSeed = async (db: Database) => {
  try {
    const guestUserEmail = usersJSON[0].email;
    const data = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, guestUserEmail));

    const deviceTypesValues = deviceTypesJSON.map((deviceType) => ({
      id: generateId(),
      userId: data[0].id,
      name: deviceType.name,
    }));

    const { rowCount } = await db.insert(deviceTypesTable).values(deviceTypesValues);

    console.info(`✅ Seeded ${rowCount} device type${rowCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed device types:", error);
  }
};

export default deviceTypesSeed;
