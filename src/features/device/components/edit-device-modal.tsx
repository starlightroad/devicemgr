"use client";

import { FolderClosedIcon } from "lucide-react";

import { Button, Form, Input, Label, Modal, type ModalRootProps, Surface, TextField } from "@heroui/react";

export default function EditDeviceModal({ isOpen, onOpenChange }: Pick<ModalRootProps, "isOpen" | "onOpenChange">) {
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
                    <Input variant="secondary" placeholder="John's MacBook Pro" autoComplete="off" className="h-10" />
                  </TextField>
                  <TextField type="text" name="type" isRequired>
                    <Label>Type</Label>
                    <Input variant="secondary" placeholder="Select type" autoComplete="off" className="h-10" />
                  </TextField>
                  <TextField type="text" name="status" isRequired>
                    <Label>Status</Label>
                    <Input variant="secondary" placeholder="Select status" autoComplete="off" className="h-10" />
                  </TextField>
                  <TextField type="text" name="group" isRequired>
                    <Label>Group</Label>
                    <Input variant="secondary" placeholder="Select group" autoComplete="off" className="h-10" />
                  </TextField>
                  <TextField type="text" name="serial-number" isRequired>
                    <Label>Serial Number</Label>
                    <Input variant="secondary" placeholder="SN-LTP-1002" autoComplete="off" className="h-10" />
                  </TextField>
                  <TextField type="text" name="ip-address">
                    <Label>IP Address</Label>
                    <Input variant="secondary" placeholder="192.168.1.1" autoComplete="off" className="h-10" />
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
