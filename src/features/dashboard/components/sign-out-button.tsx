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
      size="lg"
      className="justify-start gap-3 px-3"
      onClick={async () => await signOut()}
    >
      <LogOutIcon className="text-muted-foreground" />
      <span className="text-sm">Sign Out</span>
    </Button>
  );
}
