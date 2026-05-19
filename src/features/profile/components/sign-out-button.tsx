"use client";

import { toast } from "sonner";

import { useTransition } from "react";

import useSignOut from "@/features/auth/hooks/use-sign-out";

import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  const { signOut } = useSignOut();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOut();

      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <Button type="button" variant="outline" disabled={isPending} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
