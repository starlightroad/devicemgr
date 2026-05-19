"use client";

import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { deleteAccount } from "@/features/profile/lib/actions";

import { Button } from "@/components/ui/button";

export default function DeleteAccountForm() {
  const [state, formAction, isPending] = useActionState(deleteAccount, undefined);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state?.error]);

  return (
    <form action={formAction}>
      <Button type="submit" variant="destructive" disabled={isPending}>
        Delete Account
      </Button>
    </form>
  );
}
