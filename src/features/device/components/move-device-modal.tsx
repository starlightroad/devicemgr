"use client";

import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Modal, Surface } from "@heroui/react";

import { moveDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps, DeviceGroup } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Button } from "@/components/ui/button";

import FieldErrorMessage from "@/features/device/components/field-error-message";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type MoveDeviceModalProps = BaseDeviceModalProps<{ deviceGroup: string; groups: DeviceGroup[] | null }>;

export default function MoveDeviceModal({ deviceId, deviceGroup, groups, onClose }: MoveDeviceModalProps) {
  const isGroupsEmpty = groups?.length === 0;

  const selectedGroupId = groups?.find((group) => group.name === deviceGroup)?.id;

  const { field, handleFieldChange } = useFields({ group: { name: "group", value: "" } });

  const [state, formAction, isFormLoading] = useActionState(moveDevice.bind(null, deviceId), undefined);

  useFormSuccess(state?.success, () => {
    onClose();
    toast.success(ACTION_MESSAGE.moved);
  });

  useEffect(() => {
    if (selectedGroupId) handleFieldChange("group", selectedGroupId);
  }, [handleFieldChange, selectedGroupId]);

  return (
    <Modal isOpen onOpenChange={onClose}>
      <Button className="hidden">Move Device</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <FolderClosedIcon className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Move Device</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="px-1 py-4">
              <Surface variant="default">
                <form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
                  <Select
                    items={groups?.map((group) => ({ label: group.id, value: group.name }))}
                    required
                    disabled={isGroupsEmpty}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Groups</SelectLabel>
                        {groups?.map((group) => (
                          <SelectItem key={group.name} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FieldErrorMessage
                    message={isGroupsEmpty ? "No entries found." : state?.serverErrors?.group}
                    isFormLoading={isFormLoading}
                  />
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" form={FORM_ID} disabled={isGroupsEmpty || isFormLoading}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
