"use client";

import { useActionState, useEffect } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Button, Form, Label, ListBox, Modal, Select, Surface } from "@heroui/react";

import {
  FieldErrorMessage,
  FORM_ID,
  generateId,
  moveDevice,
  type MoveDeviceModalProps,
  useDeviceGroups,
  useFields,
  useFormSuccess,
} from "@/features/device";

export default function MoveDeviceModal({ deviceId, deviceGroup, onClose }: MoveDeviceModalProps) {
  const { groups, loading, error: groupsError } = useDeviceGroups();

  const selectedGroupId = groups?.find((group) => group.name === deviceGroup)?.id;

  const { field, handleFieldChange } = useFields({ group: { name: "group", value: "" } });

  const [state, formAction, isFormLoading] = useActionState(moveDevice.bind(null, deviceId), undefined);

  useEffect(() => {
    if (selectedGroupId) handleFieldChange("group", selectedGroupId);
  }, [handleFieldChange, selectedGroupId]);

  useFormSuccess(state?.success, onClose);

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
                <Form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
                  <Select
                    name={field.group.name}
                    variant="secondary"
                    placeholder="Select group"
                    isRequired
                    value={field.group.value}
                    onChange={(value) => handleFieldChange("group", String(value))}
                    isDisabled={loading || Boolean(groupsError)}
                    defaultValue={field.group.value}
                  >
                    <Label>Group</Label>
                    <Select.Trigger className="h-10">
                      <Select.Indicator />
                      <Select.Value className="leading-6" />
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
                      message={groupsError ? groupsError : state?.serverErrors?.group}
                      isFormLoading={isFormLoading}
                    />
                  </Select>
                </Form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" form={FORM_ID} isPending={isFormLoading} isDisabled={loading}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
