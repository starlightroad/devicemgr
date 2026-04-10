import "@/lib/config/env";

import { eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import deviceStatusesJSON from "@/lib/data/device-statuses.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceStatusesTable, usersTable } from "@/db/schemas";

const deviceStatusesSeed = async (db: Database) => {
  try {
    const guestUserEmail = usersJSON[0].email;
    const data = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, guestUserEmail));

    const deviceStatusesValues = deviceStatusesJSON.map((deviceStatus) => ({
      id: generateId(),
      userId: data[0].id,
      name: deviceStatus.name,
    }));

    const { rowCount } = await db.insert(deviceStatusesTable).values(deviceStatusesValues);

    console.info(`✅ Seeded ${rowCount} device status${rowCount === 1 ? "" : "es"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed device statuses:", error);
  }
};

export default deviceStatusesSeed;
