"use client";

import { toast } from "sonner";

import { useState, useTransition } from "react";

import { deleteDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps } from "@/features/device/lib/definitions";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteDeviceModalProps = BaseDeviceModalProps & { deviceName: string };

export default function DeleteDeviceModal({ deviceId, deviceName, onClose }: DeleteDeviceModalProps) {
  const [isPending, startTransition] = useTransition();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formAction = () => {
    startTransition(async () => {
      const { success, serverErrors } = await deleteDevice(deviceId);

      if (success) {
        toast.success(ACTION_MESSAGE.deleted);
      }

      if (serverErrors?.message) {
        setErrorMessage(serverErrors?.message);
      }
    });
  };

  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete device permanently?</AlertDialogTitle>
          <AlertDialogDescription className="text-wrap">
            This will permanently delete <strong>{deviceName}</strong>. This action cannot be undone.
          </AlertDialogDescription>
          {errorMessage && (
            <span role="alert" className="text-destructive text-xs">
              {errorMessage}
            </span>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction type="submit" variant="destructive" disabled={isPending}>
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
