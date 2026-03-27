import { loadEnvConfig } from "@next/env";

import { drizzle } from "drizzle-orm/node-postgres";

loadEnvConfig(process.cwd());

export const db = drizzle(process.env.DATABASE_URL!);

export type Database = typeof db;
