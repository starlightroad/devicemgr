"use client";

import { toast } from "sonner";

import { useActionState } from "react";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import { updateDevice } from "@/features/device/lib/actions";

import type { Device, DeviceGroup, DeviceStatus, DeviceType } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type EditDeviceModalProps = {
  device: Device;
  types: DeviceType[] | null;
  statuses: DeviceStatus[] | null;
  groups: DeviceGroup[] | null;
  onClose: () => void;
};

export default function EditDeviceModal({ device, types, statuses, groups, onClose }: EditDeviceModalProps) {
  const isTypesEmpty = !types || types?.length === 0;

  const isStatusesEmpty = !statuses || statuses?.length === 0;

  const isGroupsEmpty = !groups || groups?.length === 0;

  const { field, handleFieldChange } = useFields({
    name: device.name,
    typeId: device.typeId,
    statusId: device.statusId,
    groupId: device.groupId,
    serialNumber: device.serialNumber,
    ipAddress: device.ipAddress,
  });

  const [state, formAction, isFormLoading] = useActionState(updateDevice.bind(null, device.id), undefined);

  const closeModalAndShowToast = () => {
    onClose();
    toast.success(ACTION_MESSAGE.updated);
  };

  useFormSuccess(state?.success, closeModalAndShowToast);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
        </DialogHeader>
        <form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John's MacBook Pro"
                autoComplete="off"
                value={field.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
              />
              <FieldError>{state?.serverErrors?.name}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="type">Type</FieldLabel>
              <Select
                id="type"
                name="type"
                items={types?.map((type) => ({ label: type.name, value: type.id }))}
                value={isTypesEmpty ? null : field.typeId}
                onValueChange={(e) => handleFieldChange("typeId", e)}
                disabled={isTypesEmpty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {types?.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{isTypesEmpty ? "Failed to load types." : state?.serverErrors?.type}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select
                id="status"
                name="status"
                items={statuses?.map((status) => ({ label: status.name, value: status.id }))}
                value={isStatusesEmpty ? null : field.statusId}
                onValueChange={(e) => handleFieldChange("statusId", e)}
                disabled={isStatusesEmpty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statuses?.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{isStatusesEmpty ? "Failed to load statuses." : state?.serverErrors?.status}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="group">Group</FieldLabel>
              <Select
                id="group"
                name="group"
                items={groups?.map((group) => ({ label: group.name, value: group.id }))}
                value={isGroupsEmpty ? null : field.groupId}
                onValueChange={(e) => handleFieldChange("groupId", e)}
                disabled={isGroupsEmpty}
                required
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
            <Field>
              <FieldLabel htmlFor="serial-number">Serial Number</FieldLabel>
              <Input
                id="serial-number"
                type="text"
                name="serial-number"
                placeholder="SN-LTP-1002"
                autoComplete="off"
                value={field.serialNumber}
                onChange={(e) => handleFieldChange("serialNumber", e.target.value)}
                required
              />
              <FieldError>{state?.serverErrors?.serialNumber}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="ip-address">IP Address</FieldLabel>
              <Input
                id="ip-address"
                type="text"
                name="ip-address"
                placeholder="192.168.1.1"
                value={field.ipAddress ?? ""}
                onChange={(e) => handleFieldChange("ipAddress", e.target.value)}
                autoComplete="off"
              />
              <FieldError>{state?.serverErrors?.ipAddress}</FieldError>
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            form={FORM_ID}
            disabled={isTypesEmpty || isStatusesEmpty || isGroupsEmpty || isFormLoading}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
