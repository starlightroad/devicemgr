"use client";

import { toast } from "sonner";

import { useActionState } from "react";

import { deleteDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps } from "@/features/device/lib/definitions";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type DeleteDeviceModalProps = BaseDeviceModalProps & { deviceName: string };

export default function DeleteDeviceModal({ deviceId, deviceName, onClose }: DeleteDeviceModalProps) {
  const [state, formAction, isFormLoading] = useActionState(deleteDevice.bind(null, deviceId), undefined);

  useFormSuccess(state?.success, () => {
    onClose();
    toast.success(ACTION_MESSAGE.deleted);
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger hidden>Delete Device</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete device permanently?</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{deviceName}</strong>. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {state?.serverErrors?.message && (
          <p aria-live="polite" className="text-danger px-1 text-xs">
            {state.serverErrors.message}
          </p>
        )}
        <DialogFooter>
          <Button type="button" slot="close" variant="secondary">
            Cancel
          </Button>
          <form action={formAction}>
            <Button type="submit" variant="destructive" disabled={isFormLoading}>
              Delete
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
