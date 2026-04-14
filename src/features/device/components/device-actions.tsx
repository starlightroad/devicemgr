"use client";

import { useState } from "react";

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

import { EditDeviceModal } from "@/features/device";

const initialState = {
  isEditAction: false,
  isMoveAction: false,
  isShareAction: false,
  isDeleteAction: false,
};

export default function DeviceActions() {
  const [modalState, setModalState] = useState<typeof initialState>(initialState);

  const openModal = (key: keyof typeof initialState) => {
    setModalState((prevState) => ({ ...prevState, [key]: true }));
  };

  const handleAction = (key: Key) => {
    if (key === "view") {
      // Will need to change the URL in the future.
      window.open("#", "_blank");
      return;
    }

    if (key === "edit") {
      openModal("isEditAction");
      return;
    }
  };

  return (
    <>
      <Dropdown>
        <Button type="button" variant="outline" size="sm" isIconOnly aria-label="Actions">
          <MoreVerticalIcon />
        </Button>
        <Dropdown.Popover placement="bottom right">
          <Dropdown.Menu onAction={(key) => handleAction(key)}>
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
      <EditDeviceModal
        isOpen={modalState.isEditAction}
        onOpenChange={() => {
          setModalState(initialState);
        }}
      />
    </>
  );
}
