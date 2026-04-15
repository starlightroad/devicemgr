"use client";

import { useState } from "react";

import { FolderClosedIcon } from "lucide-react";

import { Button, Form, Input, Label, ListBox, Modal, Select, Surface, TextField } from "@heroui/react";

import { generateId, useDeviceStatuses, type MoveDeviceModalProps } from "@/features/device";

export default function EditDeviceModal({ isOpen, onOpenChange, data }: MoveDeviceModalProps) {
  const [formData, setFormData] = useState({
    id: data.id,
    name: data.name,
    "serial-number": data.serialNumber,
    "ip-address": data.ipAddress ?? "",
    type: data.type,
    status: generateId(data.status),
    group: data.group,
  });

  const { statuses } = useDeviceStatuses();

  const handleChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
                <Form id="edit-device-form" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                  <TextField type="text" name="name" isRequired>
                    <Label>Name</Label>
                    <Input
                      variant="secondary"
                      placeholder="John's MacBook Pro"
                      autoComplete="off"
                      className="h-10"
                      value={formData.name}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </TextField>
                  <TextField type="text" name="type" isRequired>
                    <Label>Type</Label>
                    <Input
                      variant="secondary"
                      placeholder="Select type"
                      autoComplete="off"
                      className="h-10"
                      value={formData.type}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </TextField>
                  <Select
                    name="status"
                    variant="secondary"
                    placeholder="Select status"
                    isRequired
                    value={formData.status}
                    onChange={(e) => handleChange("status", String(e))}
                  >
                    <Label>Status</Label>
                    <Select.Trigger className="h-10">
                      <Select.Value />
                      <Select.Indicator className="leading-6" />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {statuses?.map((status) => {
                          const id = generateId(status.name);

                          return (
                            <ListBox.Item key={id} id={id} textValue={status.name}>
                              {status.name}
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          );
                        })}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                  <TextField type="text" name="group" isRequired>
                    <Label>Group</Label>
                    <Input
                      variant="secondary"
                      placeholder="Select group"
                      autoComplete="off"
                      className="h-10"
                      value={formData.group}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </TextField>
                  <TextField type="text" name="serial-number" isRequired>
                    <Label>Serial Number</Label>
                    <Input
                      variant="secondary"
                      placeholder="SN-LTP-1002"
                      autoComplete="off"
                      className="h-10"
                      value={formData["serial-number"]}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </TextField>
                  <TextField type="text" name="ip-address">
                    <Label>IP Address</Label>
                    <Input
                      variant="secondary"
                      placeholder="192.168.1.1"
                      autoComplete="off"
                      className="h-10"
                      value={formData["ip-address"]}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </TextField>
                </Form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close" variant="secondary">
                Cancel
              </Button>
              <Button type="submit" isDisabled>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
