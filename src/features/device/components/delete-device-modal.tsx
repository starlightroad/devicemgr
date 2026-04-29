"use client";

import { toast } from "sonner";

import { useActionState } from "react";

import { deleteDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps } from "@/features/device/lib/definitions";

import useFormSuccess from "@/features/device/hooks/use-form-success";

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
  const [state, formAction, isFormLoading] = useActionState(deleteDevice.bind(null, deviceId), undefined);

  const closeModalAndShowToast = () => {
    onClose();
    toast.success(ACTION_MESSAGE.deleted);
  };

  useFormSuccess(state?.success, closeModalAndShowToast);

  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete device permanently?</AlertDialogTitle>
          <AlertDialogDescription className="text-wrap">
            This will permanently delete <strong>{deviceName}</strong>. This action cannot be undone.
          </AlertDialogDescription>
          {state?.serverErrors?.message && (
            <span role="alert" className="text-destructive text-xs">
              {state.serverErrors.message}
            </span>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction type="submit" variant="destructive" disabled={isFormLoading}>
              Delete
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
