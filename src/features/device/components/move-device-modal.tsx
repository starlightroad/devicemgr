"use client";

import { useActionState, useEffect } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Form, Label, ListBox, Modal, Select, Surface, toast } from "@heroui/react";

import { generateId } from "@/features/device/lib/utils";

import { moveDevice } from "@/features/device/lib/actions";

import { ACTION_MESSAGE, FORM_ID } from "@/features/device/lib/constants";

import type { BaseDeviceModalProps, DeviceGroup } from "@/features/device/lib/definitions";

import useFields from "@/features/device/hooks/use-fields";

import useFormSuccess from "@/features/device/hooks/use-form-success";

import { Button } from "@/components/ui/button";

import FieldErrorMessage from "@/features/device/components/field-error-message";

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
                <Form id={FORM_ID} action={formAction} className="flex flex-col gap-4">
                  <Select
                    name={field.group.name}
                    variant="secondary"
                    placeholder="Select group"
                    isRequired
                    value={field.group.value}
                    onChange={(value) => handleFieldChange("group", String(value))}
                    isDisabled={isGroupsEmpty}
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
                      message={isGroupsEmpty ? "No entries found." : state?.serverErrors?.group}
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
