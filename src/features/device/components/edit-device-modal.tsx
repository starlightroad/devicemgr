"use client";

import { toast } from "sonner";

import { useActionState, useEffect } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Modal, Surface } from "@heroui/react";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import { generateDeviceFieldIds } from "@/features/device/lib/utils";

import { updateDevice } from "@/features/device/lib/actions";

import type { Device, DeviceGroup, DeviceStatus, DeviceType } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Field, FieldLabel } from "@/components/ui/field";

import FieldErrorMessage from "@/features/device/components/field-error-message";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type EditDeviceModalProps = {
  device: Device;
  types: DeviceType[] | null;
  statuses: DeviceStatus[] | null;
  groups: DeviceGroup[] | null;
  onClose: () => void;
};

export default function EditDeviceModal({ device, types, statuses, groups, onClose }: EditDeviceModalProps) {
  const isTypesEmpty = types?.length === 0;

  const isStatusesEmpty = statuses?.length === 0;

  const isGroupsEmpty = groups?.length === 0;

  const selectedTypeId = types?.find((type) => type.name === device.type)?.id;

  const selectedStatusId = statuses?.find((status) => status.name === device.status)?.id;

  const selectedGroupId = groups?.find((group) => group.name === device.group)?.id;

  const { field, handleFieldChange } = useFields(generateDeviceFieldIds(device));

  const [state, formAction, isFormLoading] = useActionState(updateDevice.bind(null, device.id), undefined);

  useFormSuccess(state?.success, () => {
    onClose();
    toast.success(ACTION_MESSAGE.updated);
  });

  useEffect(() => {
    if (selectedTypeId) handleFieldChange("type", selectedTypeId);
    if (selectedStatusId) handleFieldChange("status", selectedStatusId);
    if (selectedGroupId) handleFieldChange("group", selectedGroupId);
  }, [handleFieldChange, selectedTypeId, selectedStatusId, selectedGroupId]);

  return (
    <Modal isOpen onOpenChange={onClose}>
      <Button className="hidden">Edit Device</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <FolderClosedIcon className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Device</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="px-1 py-4">
              <Surface variant="default">
                <form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
                  <Field>
                    <FieldLabel htmlFor={field.name.name}>Name</FieldLabel>
                    <Input
                      id={field.name.name}
                      type="text"
                      name={field.name.name}
                      placeholder="John's MacBook Pro"
                      autoComplete="off"
                      value={field.name.value}
                      required
                      className="h-10"
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                    <FieldErrorMessage message={state?.serverErrors?.name} isFormLoading={isFormLoading} />
                  </Field>
                  <Select
                    items={types?.map((type) => ({ label: type.name, value: type.name }))}
                    disabled={isTypesEmpty}
                    defaultValue={field.type.value}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {types?.map((type) => (
                          <SelectItem key={type.name} value={type.name}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    items={statuses?.map((status) => ({ label: status.name, value: status.name }))}
                    disabled={isStatusesEmpty}
                    defaultValue={field.status.value}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statuses?.map((status) => (
                          <SelectItem key={status.name} value={status.name}>
                            {status.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    items={groups?.map((group) => ({ label: group.name, value: group.name }))}
                    disabled={isGroupsEmpty}
                    defaultValue={field.group.value}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {groups?.map((group) => (
                          <SelectItem key={group.name} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    items={groups?.map((group) => ({ label: group.name, value: group.name }))}
                    disabled={isGroupsEmpty}
                    defaultValue={field.group.value}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {groups?.map((group) => (
                          <SelectItem key={group.name} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Field>
                    <FieldLabel htmlFor={field.serialNumber.name}>Serial Number</FieldLabel>
                    <Input
                      id={field.serialNumber.name}
                      type="text"
                      name={field.serialNumber.name}
                      placeholder="SN-LTP-1002"
                      autoComplete="off"
                      value={field.serialNumber.value}
                      required
                      className="h-10"
                      onChange={(e) => handleFieldChange("serialNumber", e.target.value)}
                    />
                    <FieldErrorMessage message={state?.serverErrors?.serialNumber} isFormLoading={isFormLoading} />
                  </Field>
                  <Field>
                    <FieldLabel>IP Address</FieldLabel>
                    <Input
                      id={field.ipAddress.name}
                      type="text"
                      name={field.ipAddress.name}
                      placeholder="192.168.1.1"
                      autoComplete="off"
                      value={field.ipAddress.value}
                      className="h-10"
                      onChange={(e) => handleFieldChange("ipAddress", e.target.value)}
                    />
                    <FieldErrorMessage message={state?.serverErrors?.ipAddress} isFormLoading={isFormLoading} />
                  </Field>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                form={FORM_ID}
                disabled={isTypesEmpty || isStatusesEmpty || isGroupsEmpty || isFormLoading}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
