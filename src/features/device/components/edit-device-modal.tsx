"use client";

import { useActionState, useCallback, useEffect, useState } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Button, Form, Input, Label, ListBox, Modal, Select, Surface, TextField } from "@heroui/react";

import {
  type EditDeviceModalProps,
  FieldErrorMessage,
  generateDeviceFieldIds,
  generateId,
  updateDevice,
  useDeviceGroups,
  useDeviceStatuses,
  useDeviceTypes,
} from "@/features/device";

const FORM_ID = "edit-device-form";

export default function EditDeviceModal({ device, onClose }: EditDeviceModalProps) {
  const { types, loading: isTypesLoading } = useDeviceTypes();

  const { statuses, loading: isStatusesLoading } = useDeviceStatuses();

  const { groups, loading: isGroupsLoading } = useDeviceGroups();

  const selectedTypeId = types?.find((type) => type.name === device.type)?.id;

  const selectedStatusId = statuses?.find((status) => status.name === device.status)?.id;

  const selectedGroupId = groups?.find((group) => group.name === device.group)?.id;

  const [field, setField] = useState(generateDeviceFieldIds(device));

  const [state, formAction, isFormLoading] = useActionState(updateDevice, undefined);

  const handleFieldChange = useCallback((name: keyof typeof field, value: string) => {
    setField((prevState) => ({ ...prevState, [name]: { name: prevState[name].name, value } }));
  }, []);

  useEffect(() => {
    const updateField = (name: keyof typeof field, value?: string) => {
      handleFieldChange(name, value ?? "");
    };

    if (selectedTypeId) updateField("type", selectedTypeId);

    if (selectedStatusId) updateField("status", selectedStatusId);

    if (selectedGroupId) updateField("group", selectedGroupId);
  }, [selectedTypeId, selectedStatusId, selectedGroupId, handleFieldChange]);

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
                    <FieldErrorMessage message={state?.serverErrors.name} isFormLoading={isFormLoading} />
                  </TextField>
                  <Select
                    name={field.type.name}
                    variant="secondary"
                    placeholder="Select type"
                    isRequired
                    value={field.type.value}
                    onChange={(e) => handleFieldChange("type", String(e))}
                    isDisabled={isTypesLoading}
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
                    <FieldErrorMessage message={state?.serverErrors.type} isFormLoading={isFormLoading} />
                  </Select>
                  <Select
                    name={field.status.name}
                    variant="secondary"
                    placeholder="Select status"
                    isRequired
                    value={field.status.value}
                    onChange={(e) => handleFieldChange("status", String(e))}
                    isDisabled={isStatusesLoading}
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
                    <FieldErrorMessage message={state?.serverErrors.status} isFormLoading={isFormLoading} />
                  </Select>
                  <Select
                    name={field.group.name}
                    variant="secondary"
                    placeholder="Select group"
                    isRequired
                    value={field.group.value}
                    onChange={(e) => handleFieldChange("group", String(e))}
                    isDisabled={isGroupsLoading}
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
                    <FieldErrorMessage message={state?.serverErrors.group} isFormLoading={isFormLoading} />
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
                    <FieldErrorMessage message={state?.serverErrors.serialNumber} isFormLoading={isFormLoading} />
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
                    <FieldErrorMessage message={state?.serverErrors.ipAddress} isFormLoading={isFormLoading} />
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
                isDisabled={isTypesLoading || isStatusesLoading || isGroupsLoading}
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
