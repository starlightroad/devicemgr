"use client";

import { LogOutIcon } from "lucide-react";

import useSignOut from "@/features/auth/hooks/use-sign-out";

import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const { signOut } = useSignOut();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="w-full justify-start"
      onClick={async () => await signOut()}
    >
      <LogOutIcon className="text-muted size-4" />
      Sign Out
    </Button>
  );
}
