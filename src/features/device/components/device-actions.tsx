"use client";

import { toast } from "sonner";

import { useState } from "react";

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

import { ACTION_MESSAGE } from "@/features/device/lib/constants";

import useCopyToClipboard from "@/features/device/hooks/use-copy-to-clipboard";

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

export default function DeviceActions({ device, types, statuses, groups }: DeviceActionsProps) {
  const { copy } = useCopyToClipboard();

  const [modal, setModal] = useState<string | null>(null);

  const copyDeviceId = async () => {
    try {
      await copy(device.id);
      toast.success(ACTION_MESSAGE.copied);
    } catch {
      toast.error("Failed to copy device ID.");
    }
  };

  const viewDeviceInNewTab = () => {
    // Will need to change the URL in the future.
    window.open("#", "_blank");
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
          <DropdownMenuItem onClick={viewDeviceInNewTab} className="focus:[&>svg]:stroke-muted-foreground">
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
          <DropdownMenuItem onClick={copyDeviceId} className="focus:[&>svg]:stroke-muted-foreground">
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
        <EditDeviceModal
          device={device}
          types={types}
          statuses={statuses}
          groups={groups}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "move" && (
        <MoveDeviceModal deviceId={device.id} groupId={device.groupId} groups={groups} onClose={() => setModal(null)} />
      )}
      {modal === "share" && <ShareDeviceModal deviceId={device.id} onClose={() => setModal(null)} />}
      {modal === "delete" && (
        <DeleteDeviceModal deviceId={device.id} deviceName={device.name} onClose={() => setModal(null)} />
      )}
    </>
  );
}
