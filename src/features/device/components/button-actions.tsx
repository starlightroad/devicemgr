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
    <ButtonGroup>
      <Button type="button" variant="outline" size="sm">
        <PlusIcon />
        New Device
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label="More Options"
          className={buttonVariants({ variant: "outline", size: "icon-sm" })}
        >
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
