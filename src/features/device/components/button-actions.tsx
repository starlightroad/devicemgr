import { ButtonGroup } from "@/components/ui/button-group";

import { Button, buttonVariants } from "@/components/ui/button";

import { ChevronDownIcon, DownloadCloudIcon, ImportIcon, PlusIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ButtonActions() {
  return (
    <ButtonGroup className="grow justify-end">
      <Button type="button" variant="outline">
        <PlusIcon />
        New Device
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="More Options" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ChevronDownIcon />
        </DropdownMenuTrigger>
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
    </ButtonGroup>
  );
}
