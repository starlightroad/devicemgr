"use server";

import { getUser } from "@/dal/user";

import { canDeleteAccount } from "@/lib/dto";

import { ACTION_MESSAGE } from "@/features/profile/lib/constants";

export const deleteAccount = async () => {
  try {
    const currentUser = await getUser();

    if (!canDeleteAccount(currentUser)) {
      return {
        error: ACTION_MESSAGE.denied,
      };
    }

    // Perform the action to delete the user's account
  } catch {
    return {
      error: ACTION_MESSAGE.failed,
    };
  }
};
