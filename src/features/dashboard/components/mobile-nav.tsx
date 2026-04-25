import { PanelRightIcon } from "lucide-react";

import { Dropdown } from "@heroui/react";

import { Button } from "@/components/ui/button";

import UserProfile from "@/features/dashboard/components/user-profile";

import MobileNavMenu from "@/features/dashboard/components/mobile-nav-menu";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function MobileNav() {
  return (
    <nav role="Navigation" className="md:hidden">
      <Dropdown>
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
        <Dropdown.Popover className="md:hidden">
          <div className="px-3">
            <UserProfile />
          </div>
          <MobileNavMenu />
        </Dropdown.Popover>
      </Dropdown>
    </nav>
  );
}
