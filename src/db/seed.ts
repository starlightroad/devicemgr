import { getTableName, sql, Table } from "drizzle-orm";

import * as schemas from "@/db/schemas";

import usersSeed from "@/db/seeds/users";

import { db, type Database } from "@/db/client";

const resetTable = async (db: Database, table: Table) => {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
};

const initSeed = async () => {
  const tables = [schemas.usersTable];

  try {
    for (const table of tables) {
      await resetTable(db, table);
    }

    await usersSeed(db);
  } catch (error) {
    console.error(error);
  } finally {
    db.$client.end();
  }
};

initSeed();
