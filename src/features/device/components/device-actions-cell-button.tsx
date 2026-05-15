"use client";

import {
  CircleEllipsisIcon,
  CopyIcon,
  FolderClosedIcon,
  MoreVerticalIcon,
  Share2Icon,
  SquareArrowUpRightIcon,
  Trash2Icon,
} from "lucide-react";

import type { Device, DeviceGroup, DeviceStatus, DeviceType } from "@/features/device/lib/definitions";

import { createDeviceUrlById } from "@/features/device/lib/utils";

import useModal from "@/features/device/hooks/use-modal";

import useCopyDeviceId from "@/features/device/hooks/use-copy-device-id";

import { buttonVariants } from "@/components/ui/button";

import EditDeviceModal from "@/features/device/components/edit-device-modal";

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

type DeviceActionsProps = {
  device: Device;
  types: DeviceType[] | null;
  statuses: DeviceStatus[] | null;
  groups: DeviceGroup[] | null;
};

export default function DeviceActionsCellButton({ device, types, statuses, groups }: DeviceActionsProps) {
  const { handleCopy } = useCopyDeviceId();

  const { modal, setModal, closeModal } = useModal();

  const deviceId = device.id;

  const deviceName = device.name;

  const groupId = device.groupId;

  const handleViewDeviceInNewTab = () => {
    const deviceUrl = createDeviceUrlById(device.id);
    window.open(deviceUrl, "_blank");
  };

  return (
    <>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                aria-label="Actions"
                className={buttonVariants({ variant: "ghost", size: "icon-xs" })}
              >
                <MoreVerticalIcon />
              </DropdownMenuTrigger>
            }
          />
          <TooltipContent>
            <p>Actions</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem onClick={handleViewDeviceInNewTab} className="focus:[&>svg]:stroke-muted-foreground">
            <SquareArrowUpRightIcon className="text-muted-foreground" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModal("edit")} className="focus:[&>svg]:stroke-muted-foreground">
            <CircleEllipsisIcon className="text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
      {modal === "edit" && (
        <EditDeviceModal device={device} types={types} statuses={statuses} groups={groups} onClose={closeModal} />
      )}
      {modal === "move" && (
        <MoveDeviceModal deviceId={deviceId} groupId={groupId} groups={groups} onClose={closeModal} />
      )}
      {modal === "share" && <ShareDeviceModal deviceId={deviceId} onClose={closeModal} />}
      {modal === "delete" && <DeleteDeviceModal deviceId={deviceId} deviceName={deviceName} onClose={closeModal} />}
    </>
  );
}
