import { PanelRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserProfile from "@/features/dashboard/components/user-profile";

import MobileNavMenu from "@/features/dashboard/components/mobile-nav-menu";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function MobileNav() {
  return (
    <nav role="Navigation" className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button type="button" variant="ghost" size="icon-sm">
                    <PanelRightIcon />
                  </Button>
                }
              />
              <TooltipContent>
                <p>Navigation</p>
              </TooltipContent>
            </Tooltip>
          }
        />
        <DropdownMenuContent className="md:hidden">
          <UserProfile />
          <MobileNavMenu />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
