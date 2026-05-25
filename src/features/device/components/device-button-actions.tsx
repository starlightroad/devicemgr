"use client";

import Link from "next/link";

import { DownloadCloudIcon, ImportIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { NEW_DEVICE_PATH } from "@/features/dashboard/lib/constants";

import useDownloadDevices from "@/features/device/hooks/use-download-devices";

import { Button, buttonVariants } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DeviceButtonActions() {
  const { handleDownload } = useDownloadDevices();

  return (
    <>
      <Link href={NEW_DEVICE_PATH} className={cn(buttonVariants({ variant: "outline" }), "border")}>
        <PlusIcon />
        New Device
      </Link>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="More Options"
                    className="border-l-0"
                  />
                }
              >
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
            }
          />
          <TooltipContent>
            <p>More options</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={handleDownload}>
            <DownloadCloudIcon />
            Download CSV
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ImportIcon />
            Import...
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
