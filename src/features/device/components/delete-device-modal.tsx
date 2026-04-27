"use client";

import { toast } from "sonner";

import { useActionState } from "react";

import { deleteDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps } from "@/features/device/lib/definitions";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type DeleteDeviceModalProps = BaseDeviceModalProps & { deviceName: string };

export default function DeleteDeviceModal({ deviceId, deviceName, onClose }: DeleteDeviceModalProps) {
  const [state, formAction, isFormLoading] = useActionState(deleteDevice.bind(null, deviceId), undefined);

  const closeModalAndShowToast = () => {
    onClose();
    toast.success(ACTION_MESSAGE.deleted);
  };

  useFormSuccess(state?.success, closeModalAndShowToast);

  return (
    <Dialog open onOpenChange={onClose}>
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
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
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
