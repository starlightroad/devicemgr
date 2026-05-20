"use client";

import { useActionState, useState } from "react";

import { isMatch } from "@/lib/utils";

import { FORM_FIELD } from "@/features/profile/lib/constants";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type UpdateNameFormProps = {
  userName: string;
};

export default function UpdateNameForm({ userName }: UpdateNameFormProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const [updatedName, setUpdatedName] = useState(userName);

  const [state, formAction, isPending] = useActionState(() => ({ serverError: null }), undefined);

  const handleOpenChange = (open: boolean) => {
    if (!open) setTimeout(() => setUpdatedName(userName), 100);

    setModalOpen(open);
  };

  const isSubmitButtonDisabled = isPending || isMatch(userName, updatedName);

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      <form action={formAction}>
        <DialogTrigger render={<Button type="button" variant="outline" />}>Update Name</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Name</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor={FORM_FIELD.NAME.id} className="sr-only">
                Name
              </FieldLabel>
              <Input
                id={FORM_FIELD.NAME.id}
                type="text"
                autoComplete="off"
                placeholder={FORM_FIELD.NAME.placeholder}
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
              <FieldError>{state?.serverError}</FieldError>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="secondary" disabled={isPending} />}>Cancel</DialogClose>
            <Button type="submit" disabled={isSubmitButtonDisabled}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
