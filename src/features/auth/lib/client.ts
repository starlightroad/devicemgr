import { createAuthClient } from "better-auth/client";

const { signOut } = createAuthClient();

export const client = {
  signOut,
};
