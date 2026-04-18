"use client";

import { useActionState } from "react";

import { Trash2Icon } from "lucide-react";

import { AlertDialog, Button, ErrorMessage, Form } from "@heroui/react";

import { deleteDevice, useFormSuccess, type DeleteDeviceModalProps } from "@/features/device";

export default function DeleteDeviceModal({ deviceId, deviceName, onClose }: DeleteDeviceModalProps) {
  const [state, formAction, isFormLoading] = useActionState(deleteDevice.bind(null, deviceId), undefined);

  useFormSuccess(state?.success, onClose);

  return (
    <AlertDialog isOpen onOpenChange={onClose}>
      <Button type="button" variant="danger" className="hidden">
        Delete Device
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger">
                <Trash2Icon className="size-5" />
              </AlertDialog.Icon>
              <AlertDialog.Heading>Delete device permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{deviceName}</strong>. This action cannot be undone.
              </p>
              {state?.serverError && <ErrorMessage>{state.serverError}</ErrorMessage>}
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Form action={formAction}>
                <Button type="submit" variant="danger" isPending={isFormLoading}>
                  Delete
                </Button>
              </Form>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
