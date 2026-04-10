import { getTableName, sql, Table } from "drizzle-orm";

import * as schemas from "@/db/schemas";

import usersSeed from "@/db/seeds/users";

import deviceTypesSeed from "@/db/seeds/device-types";

import deviceStatusesSeed from "@/db/seeds/device-statuses";

import { db, type Database } from "@/db/client";

const resetTable = async (db: Database, table: Table) => {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
};

const initSeed = async () => {
  const tables = [schemas.usersTable, schemas.deviceTypesTable, schemas.deviceStatusesTable];

  try {
    for (const table of tables) {
      await resetTable(db, table);
    }

    await usersSeed();
    await deviceTypesSeed(db);
    await deviceStatusesSeed(db);
  } catch (error) {
    console.error(error);
  } finally {
    db.$client.end();
  }
};

initSeed();
