"use client";

import { useActionState, useEffect } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Button, Form, Input, Label, ListBox, Modal, Select, Surface, TextField, toast } from "@heroui/react";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import type { EditDeviceModalProps } from "@/features/device/lib/definitions";

import { generateDeviceFieldIds, generateId } from "@/features/device/lib/utils";

import { updateDevice } from "@/features/device/lib/actions";

import useFields from "@/features/device/hooks/use-fields";

import useDeviceTypes from "@/features/device/hooks/use-types";

import useDeviceStatuses from "@/features/device/hooks/use-statuses";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import FieldErrorMessage from "@/features/device/components/field-error-message";

export default function EditDeviceModal({ device, groups, onClose }: EditDeviceModalProps) {
  const { types, loading: isTypesLoading, error: typesError } = useDeviceTypes();

  const { statuses, loading: isStatusesLoading, error: statusesError } = useDeviceStatuses();

  const isGroupsEmpty = groups.length === 0;

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
                <Form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
                  <TextField type="text" name={field.name.name} isRequired>
                    <Label>Name</Label>
                    <Input
                      variant="secondary"
                      placeholder="John's MacBook Pro"
                      autoComplete="off"
                      className="h-10"
                      value={field.name.value}
                      onChange={(e) => handleFieldChange("name", e.target.value)}
                    />
                    <FieldErrorMessage message={state?.serverErrors?.name} isFormLoading={isFormLoading} />
                  </TextField>
                  <Select
                    name={field.type.name}
                    variant="secondary"
                    placeholder="Select type"
                    isRequired
                    value={field.type.value}
                    onChange={(e) => handleFieldChange("type", String(e))}
                    isDisabled={typesError ? true : isTypesLoading}
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
                      message={typesError ? typesError : state?.serverErrors?.type}
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
                    isDisabled={Boolean(statusesError) || isStatusesLoading}
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
                      message={statusesError ? statusesError : state?.serverErrors?.status}
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
                  <TextField type="text" name={field.serialNumber.name} isRequired>
                    <Label>Serial Number</Label>
                    <Input
                      variant="secondary"
                      placeholder="SN-LTP-1002"
                      autoComplete="off"
                      className="h-10"
                      value={field.serialNumber.value}
                      onChange={(e) => handleFieldChange("serialNumber", e.target.value)}
                    />
                    <FieldErrorMessage message={state?.serverErrors?.serialNumber} isFormLoading={isFormLoading} />
                  </TextField>
                  <TextField type="text" name={field.ipAddress.name}>
                    <Label>IP Address</Label>
                    <Input
                      variant="secondary"
                      placeholder="192.168.1.1"
                      autoComplete="off"
                      className="h-10"
                      value={field.ipAddress.value}
                      onChange={(e) => handleFieldChange("ipAddress", e.target.value)}
                    />
                    <FieldErrorMessage message={state?.serverErrors?.ipAddress} isFormLoading={isFormLoading} />
                  </TextField>
                </Form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                form={FORM_ID}
                isPending={isFormLoading}
                isDisabled={
                  Boolean(typesError) || Boolean(statusesError) || isTypesLoading || isStatusesLoading || isGroupsEmpty
                }
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
