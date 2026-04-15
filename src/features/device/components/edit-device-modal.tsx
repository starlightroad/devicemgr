"use client";

import { FolderClosedIcon } from "lucide-react";

import { type ChangeEvent, useState } from "react";

import { Button, Form, Input, Label, Modal, Surface, TextField } from "@heroui/react";

import type { MoveDeviceModalProps } from "@/features/device";

export default function EditDeviceModal({ isOpen, onOpenChange, data }: MoveDeviceModalProps) {
  const [formData, setFormData] = useState({
    id: data.id,
    name: data.name,
    "serial-number": data.serialNumber,
    "ip-address": data.ipAddress ?? "",
    type: data.type,
    status: data.status,
    group: data.group,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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
                      onChange={handleChange}
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
                      onChange={handleChange}
                    />
                  </TextField>
                  <TextField type="text" name="status" isRequired>
                    <Label>Status</Label>
                    <Input
                      variant="secondary"
                      placeholder="Select status"
                      autoComplete="off"
                      className="h-10"
                      value={formData.status}
                      onChange={handleChange}
                    />
                  </TextField>
                  <TextField type="text" name="group" isRequired>
                    <Label>Group</Label>
                    <Input
                      variant="secondary"
                      placeholder="Select group"
                      autoComplete="off"
                      className="h-10"
                      value={formData.group}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
