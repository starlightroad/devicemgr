import { PanelRightIcon } from "lucide-react";

import { Button, Dropdown, Tooltip } from "@heroui/react";

import { TOOLTIP_OFFSET } from "@/lib/constants";

import { MobileNavMenu, UserProfile } from "@/features/dashboard";

export default function MobileNav() {
  return (
    <nav role="Navigation" className="md:hidden">
      <Dropdown>
        <Tooltip delay={0} closeDelay={0}>
          <Button type="button" variant="ghost" size="sm" isIconOnly>
            <PanelRightIcon />
          </Button>
          <Tooltip.Content offset={TOOLTIP_OFFSET} showArrow>
            <Tooltip.Arrow />
            <p>Navigation</p>
          </Tooltip.Content>
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
