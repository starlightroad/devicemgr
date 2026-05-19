"use client";

import { useRouter } from "next/navigation";

import { client } from "@/features/auth/lib/client";

import { SIGN_OUT_ERROR_MESSAGE } from "@/features/auth/lib/constants";

export default function useSignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { data, error } = await client.signOut();

      if (!data?.success) {
        throw error;
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      return {
        error: SIGN_OUT_ERROR_MESSAGE,
      };
    }
  };

  return {
    signOut: handleSignOut,
  };
}
