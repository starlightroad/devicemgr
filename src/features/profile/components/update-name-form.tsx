"use client";

import { toast } from "sonner";

import { useState, useTransition } from "react";

import { isMatch } from "@/lib/utils";

import { updateName } from "@/features/profile/lib/actions";

import { FORM_FIELD, NAME_FORM_ID } from "@/features/profile/lib/constants";

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

  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSubmitButtonDisabled = isPending || isMatch(userName, updatedName);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setUpdatedName(userName);
        setErrorMessage(null);
      }, 100);
    }

    setModalOpen(open);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const { serverError } = await updateName();

      if (serverError) {
        toast.error(serverError);
        setErrorMessage(serverError);
      }
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleOpenChange}>
      <form id={NAME_FORM_ID} action={handleSubmit}>
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
              <FieldError>{errorMessage}</FieldError>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="secondary" disabled={isPending} />}>Cancel</DialogClose>
            <Button form={NAME_FORM_ID} type="submit" disabled={isSubmitButtonDisabled}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
