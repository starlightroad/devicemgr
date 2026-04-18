"use client";

import { useState } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Button, Form, type Key, Label, ListBox, Modal, Select, Surface } from "@heroui/react";

import { FieldErrorMessage, generateId, type MoveDeviceModalProps, useDeviceGroups } from "@/features/device";

export default function MoveDeviceModal({ deviceGroup, onClose }: MoveDeviceModalProps) {
  const { groups, loading, error } = useDeviceGroups();

  const [selectedGroup, setSelectedGroup] = useState<Key | null>(generateId(deviceGroup));

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
                <Form id="edit-device-form" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                  <Select
                    name="group"
                    variant="secondary"
                    placeholder="Select group"
                    isRequired
                    value={selectedGroup}
                    onChange={(value) => setSelectedGroup(value)}
                    isDisabled={loading || Boolean(error)}
                  >
                    <Label>Group</Label>
                    <Select.Trigger className="h-10">
                      <Select.Indicator />
                      <Select.Value className="leading-6" />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {groups?.map((group) => {
                          const id = generateId(group.name);

                          return (
                            <ListBox.Item key={id} id={id} textValue={group.name}>
                              {group.name}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          );
                        })}
                      </ListBox>
                    </Select.Popover>
                    <FieldErrorMessage message={error ? error : undefined} isFormLoading={false} />
                  </Select>
                </Form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" isDisabled={loading}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
