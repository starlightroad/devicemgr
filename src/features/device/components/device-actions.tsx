"use client";

import { useEffect, useState } from "react";

import { Button, Dropdown, type Key, Label, Separator, toast } from "@heroui/react";

import {
  CircleEllipsisIcon,
  CopyIcon,
  FolderClosedIcon,
  MoreVerticalIcon,
  Share2Icon,
  SquareArrowUpRightIcon,
  Trash2Icon,
} from "lucide-react";

import {
  DeleteDeviceModal,
  type Device,
  EditDeviceModal,
  MoveDeviceModal,
  ShareDeviceModal,
  useCopyToClipboard,
} from "@/features/device";

export default function DeviceActions({ device }: { device: Device }) {
  const { copy } = useCopyToClipboard();

  const [modal, setModal] = useState<Key | null>(null);

  const copyDeviceId = async () => {
    try {
      await copy(device.id);
      toast.success("Device ID copied to clipboard.");
    } catch {
      toast.danger("Failed to copy device ID.");
    }
  };

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
            <Dropdown.Item id="copy-id" textValue="Copy ID" onAction={copyDeviceId}>
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

      {modal === "move" && (
        <MoveDeviceModal deviceId={device.id} deviceGroup={device.group} onClose={() => setModal(null)} />
      )}

      {modal === "share" && <ShareDeviceModal deviceId={device.id} onClose={() => setModal(null)} />}

      {modal === "delete" && (
        <DeleteDeviceModal deviceId={device.id} deviceName={device.name} onClose={() => setModal(null)} />
      )}
    </>
  );
}
