"use client";

import { Button } from "@heroui/react";

import { LogOutIcon } from "lucide-react";

import useSignOut from "@/features/auth/hooks/use-sign-out";

export default function SignOutButton() {
  const { signOut } = useSignOut();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      fullWidth
      className="justify-start"
      onPress={async () => await signOut()}
    >
      <LogOutIcon className="text-muted size-4" />
      Sign Out
    </Button>
  );
}
