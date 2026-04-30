"use client";

import { toast } from "sonner";

import { useActionState } from "react";

import { moveDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps, DeviceGroup } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MoveDeviceModalProps = BaseDeviceModalProps<{
  groupId: string;
  groups: DeviceGroup[] | null;
}>;

export default function MoveDeviceModal({ deviceId, groupId, groups, onClose }: MoveDeviceModalProps) {
  const isGroupsEmpty = !groups || groups.length === 0;

  const { field, handleFieldChange } = useFields({ groupId: groupId });

  const [state, formAction, isFormLoading] = useActionState(moveDevice.bind(null, deviceId), undefined);

  const closeModalAndShowToast = () => {
    onClose();
    toast.success(ACTION_MESSAGE.moved);
  };

  useFormSuccess(state?.success, closeModalAndShowToast);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move Device</DialogTitle>
        </DialogHeader>
        <form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="group">Group</FieldLabel>
            <Select
              id="group"
              name="group"
              items={groups?.map((group) => ({ label: group.name, value: group.id }))}
              value={isGroupsEmpty ? null : field.groupId}
              onValueChange={(value) => handleFieldChange("groupId", value ?? "")}
              required
              disabled={isGroupsEmpty}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {groups?.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{isGroupsEmpty ? "Failed to load groups." : state?.serverErrors?.group}</FieldError>
          </Field>
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
