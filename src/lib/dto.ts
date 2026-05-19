import "server-only";

import type { User } from "better-auth";

import usersJSON from "@/lib/data/users.json";

export const canDeleteAccount = (currentUser: User) => {
  return currentUser.email !== usersJSON[0].email;
};
