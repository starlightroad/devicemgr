"use client";

import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { moveDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps, DeviceGroup } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Button } from "@/components/ui/button";

import FieldErrorMessage from "@/features/device/components/field-error-message";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger hidden>Move Device</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move Device</DialogTitle>
        </DialogHeader>
        <form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
          <Select
            items={groups?.map((group) => ({ label: group.id, value: group.name }))}
            required
            disabled={isGroupsEmpty}
          >
            <SelectTrigger className="w-full">
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
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <Button type="submit" form={FORM_ID} disabled={isGroupsEmpty || isFormLoading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
