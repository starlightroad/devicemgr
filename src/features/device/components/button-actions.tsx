"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { DownloadCloudIcon, ImportIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

import { DOWNLOAD_CSV_URL } from "@/features/device/lib/constants";

import { NEW_DEVICE_PATH } from "@/features/dashboard/lib/constants";

import { buttonVariants } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ButtonActions() {
  const { push } = useRouter();

  const handleDownload = () => {
    push(DOWNLOAD_CSV_URL);
  };

  return (
    <>
      <NewDeviceLink />
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                aria-label="More Options"
                className={buttonVariants({ variant: "outline", size: "icon", className: "border-l-0" })}
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

function NewDeviceLink() {
  return (
    <Link href={NEW_DEVICE_PATH} className={buttonVariants({ variant: "outline" })}>
      <PlusIcon />
      New Device
    </Link>
  );
}
