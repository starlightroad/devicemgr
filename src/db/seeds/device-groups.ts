import "@/lib/config/env";

import { eq } from "drizzle-orm";

import usersJSON from "@/lib/data/users.json";

import deviceGroupsJSON from "@/lib/data/device-groups.json";

import { generateId } from "@/lib/utils";

import type { Database } from "@/db/client";

import { deviceGroupsTable, usersTable } from "@/db/schemas";

const deviceGroupsSeed = async (db: Database) => {
  try {
    const guestUserEmail = usersJSON[0].email;
    const data = await db.select({ id: usersTable.id }).from(usersTable).where(eq(usersTable.email, guestUserEmail));

    const deviceGroupsValues = deviceGroupsJSON.map((deviceGroup) => ({
      id: generateId(),
      userId: data[0].id,
      name: deviceGroup.name,
    }));

    const { rowCount } = await db.insert(deviceGroupsTable).values(deviceGroupsValues);

    console.info(`✅ Seeded ${rowCount} device group${rowCount === 1 ? "" : "s"}.`);
  } catch (error) {
    console.error("🔥 Failed to seed device groups:", error);
  }
};

export default deviceGroupsSeed;
