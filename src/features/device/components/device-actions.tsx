"use client";

import { useEffect, useState } from "react";

import { Button, Dropdown, type Key, Label, Separator } from "@heroui/react";

import {
  CircleEllipsisIcon,
  CopyIcon,
  FolderClosedIcon,
  MoreVerticalIcon,
  Share2Icon,
  SquareArrowUpRightIcon,
  Trash2Icon,
} from "lucide-react";

import { type Device, EditDeviceModal, MoveDeviceModal } from "@/features/device";

export default function DeviceActions({ device }: { device: Device }) {
  const [modal, setModal] = useState<Key | null>(null);

  useEffect(() => {
    if (modal === "view") {
      // Will need to change the URL in the future.
      window.open("#", "_blank");
    }
  }, [modal]);

  return (
    <>
      <Dropdown>
        <Button type="button" variant="outline" size="sm" isIconOnly aria-label="Actions">
          <MoreVerticalIcon />
        </Button>
        <Dropdown.Popover placement="bottom right">
          <Dropdown.Menu onAction={(key) => setModal(key)}>
            <Dropdown.Item id="view" textValue="View">
              <SquareArrowUpRightIcon className="text-muted size-4" />
              <Label>View</Label>
            </Dropdown.Item>
            <Dropdown.Item id="edit" textValue="Edit">
              <CircleEllipsisIcon className="text-muted size-4" />
              <Label>Edit</Label>
            </Dropdown.Item>
            <Separator />
            <Dropdown.Item id="move" textValue="Move">
              <FolderClosedIcon className="text-muted size-4" />
              <Label>Move...</Label>
            </Dropdown.Item>
            <Separator />
            <Dropdown.Item id="copy-id" textValue="Copy ID">
              <CopyIcon className="text-muted size-4" />
              <Label>Copy ID</Label>
            </Dropdown.Item>
            <Dropdown.Item id="share" textValue="Share">
              <Share2Icon className="text-muted size-4" />
              <Label>Share</Label>
            </Dropdown.Item>
            <Separator />
            <Dropdown.Item id="delete" textValue="Delete" variant="danger">
              <Trash2Icon className="text-danger size-4" />
              <Label>Delete</Label>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      {modal === "edit" && <EditDeviceModal device={device} onClose={() => setModal(null)} />}

      {modal === "move" && <MoveDeviceModal deviceGroup={device.group} onClose={() => setModal(null)} />}
    </>
  );
}
