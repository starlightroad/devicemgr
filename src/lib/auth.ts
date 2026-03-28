import { betterAuth } from "better-auth";

import { nextCookies } from "better-auth/next-js";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db/client";

import * as schemas from "@/db/schemas";

import { MAX_PASSWORD, MIN_PASSWORD } from "@/features/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schemas,
  }),
  user: {
    modelName: "usersTable",
  },
  session: {
    modelName: "sessionsTable",
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  account: {
    modelName: "accountsTable",
  },
  verification: {
    modelName: "verificationsTable",
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: MIN_PASSWORD.length,
    maxPasswordLength: MAX_PASSWORD.length,
  },
  plugins: [nextCookies()],
});
