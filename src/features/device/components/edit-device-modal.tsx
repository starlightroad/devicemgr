"use client";

import { useActionState, useEffect } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Label, ListBox, Modal, Select, Surface, toast } from "@heroui/react";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import { generateDeviceFieldIds, generateId } from "@/features/device/lib/utils";

import { updateDevice } from "@/features/device/lib/actions";

import type { Device, DeviceGroup, DeviceStatus, DeviceType } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Button } from "@/components/ui/button";

import FieldErrorMessage from "@/features/device/components/field-error-message";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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
                    name={field.type.name}
                    variant="secondary"
                    placeholder="Select type"
                    isRequired
                    value={field.type.value}
                    onChange={(e) => handleFieldChange("type", String(e))}
                    isDisabled={isTypesEmpty}
                    defaultValue={field.type.value}
                  >
                    <Label>Type</Label>
                    <Select.Trigger className="h-10">
                      <Select.Value className="leading-6" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {types?.map((type) => {
                          const id = generateId(type.id);

                          return (
                            <ListBox.Item key={id} id={id} textValue={type.name}>
                              {type.name}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          );
                        })}
                      </ListBox>
                    </Select.Popover>
                    <FieldErrorMessage
                      message={isTypesEmpty ? "No entries found." : state?.serverErrors?.type}
                      isFormLoading={isFormLoading}
                    />
                  </Select>
                  <Select
                    name={field.status.name}
                    variant="secondary"
                    placeholder="Select status"
                    isRequired
                    value={field.status.value}
                    onChange={(e) => handleFieldChange("status", String(e))}
                    isDisabled={isStatusesEmpty}
                    defaultValue={field.status.value}
                  >
                    <Label>Status</Label>
                    <Select.Trigger className="h-10">
                      <Select.Value className="leading-6" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {statuses?.map((status) => {
                          const id = generateId(status.id);

                          return (
                            <ListBox.Item key={id} id={id} textValue={status.name}>
                              {status.name}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          );
                        })}
                      </ListBox>
                    </Select.Popover>
                    <FieldErrorMessage
                      message={isStatusesEmpty ? "No entries found." : state?.serverErrors?.status}
                      isFormLoading={isFormLoading}
                    />
                  </Select>
                  <Select
                    name={field.group.name}
                    variant="secondary"
                    placeholder="Select group"
                    isRequired
                    value={field.group.value}
                    onChange={(e) => handleFieldChange("group", String(e))}
                    isDisabled={isGroupsEmpty}
                    defaultValue={field.group.value}
                  >
                    <Label>Group</Label>
                    <Select.Trigger className="h-10">
                      <Select.Value className="leading-6" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {groups?.map((group) => {
                          const id = generateId(group.id);

                          return (
                            <ListBox.Item key={id} id={id} textValue={group.name}>
                              {group.name}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          );
                        })}
                      </ListBox>
                    </Select.Popover>
                    <FieldErrorMessage
                      message={isGroupsEmpty ? "No entries found." : state?.serverErrors?.group}
                      isFormLoading={isFormLoading}
                    />
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
                    <Label>IP Address</Label>
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
