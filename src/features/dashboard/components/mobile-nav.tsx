import { PanelRightIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import UserProfile from "@/features/dashboard/components/user-profile";

import MobileNavMenu from "@/features/dashboard/components/mobile-nav-menu";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function MobileNav() {
  return (
    <nav role="Navigation" className="md:hidden">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
                <PanelRightIcon />
              </DropdownMenuTrigger>
            }
          />
          <TooltipContent>
            <p>Navigation</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className="w-56 md:hidden">
          <UserProfile />
          <MobileNavMenu />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
