import Link from "next/link";

import { DownloadCloudIcon, ImportIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

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
  return (
    <>
      <NewDeviceLink />
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                aria-label="More Options"
                className={buttonVariants({ variant: "outline", size: "icon" })}
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
          <DropdownMenuItem>
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
    <Link href={NEW_DEVICE_PATH} className={buttonVariants()}>
      <PlusIcon />
      New Device
    </Link>
  );
}
