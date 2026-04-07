"use client";

import { Button } from "@heroui/react";

import { LogOutIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import { client } from "@/features/auth";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      fullWidth
      className="justify-start"
      onClick={async () => {
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
      }}
    >
      <LogOutIcon className="text-muted size-4" />
      Sign Out
    </Button>
  );
}
