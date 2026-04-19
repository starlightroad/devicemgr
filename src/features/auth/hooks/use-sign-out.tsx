"use client";

import { useRouter } from "next/navigation";

import { client } from "@/features/auth/lib/client";

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

      // Inform the user of the error
    }
  };

  return {
    signOut: handleSignOut,
  };
}
