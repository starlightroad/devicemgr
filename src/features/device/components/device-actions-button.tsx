"use client";

import { CopyIcon, FolderClosedIcon, MoreHorizontalIcon, Share2Icon, Trash2Icon } from "lucide-react";

import useModal from "@/features/device/hooks/use-modal";

import type { Device, DeviceItem } from "@/features/device/lib/definitions";

import useCopyDeviceId from "@/features/device/hooks/use-copy-device-id";

import { Button } from "@/components/ui/button";

import MoveDeviceModal from "@/features/device/components/move-device-modal";

import ShareDeviceModal from "@/features/device/components/share-device-modal";

import DeleteDeviceModal from "@/features/device/components/delete-device-modal";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DeviceActionsButtonProps = {
  device: Device;
  types: DeviceItem[] | null;
  statuses: DeviceItem[] | null;
  groups: DeviceItem[] | null;
};

export default function DeviceActionsButton({ device, groups }: DeviceActionsButtonProps) {
  const { modal, setModal, closeModal } = useModal();

  const { handleCopy } = useCopyDeviceId();

  const deviceId = device.id;

  const deviceName = device.name;

  const groupId = device.groupId;

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button type="button" variant="outline" size="icon">
                    <MoreHorizontalIcon />
                  </Button>
                }
              />
            }
          />
          <TooltipContent>
            <p>Actions</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={() => setModal("move")} className="focus:[&>svg]:stroke-muted-foreground">
            <FolderClosedIcon className="text-muted-foreground" />
            Move...
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleCopy(deviceId)} className="focus:[&>svg]:stroke-muted-foreground">
            <CopyIcon className="text-muted-foreground" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModal("share")} className="focus:[&>svg]:stroke-muted-foreground">
            <Share2Icon className="text-muted-foreground" />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => setModal("delete")}>
            <Trash2Icon className="text-danger" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {modal === "move" && (
        <MoveDeviceModal deviceId={deviceId} groupId={groupId} groups={groups} onClose={closeModal} />
      )}
      {modal === "share" && <ShareDeviceModal deviceId={deviceId} onClose={closeModal} />}
      {modal === "delete" && <DeleteDeviceModal deviceId={deviceId} deviceName={deviceName} onClose={closeModal} />}
    </>
  );
}
