import { PanelRightIcon } from "lucide-react";

import { Button, Dropdown, Tooltip } from "@heroui/react";

import { MobileNavMenu, UserProfile } from "@/features/dashboard";

export default function MobileNav() {
  return (
    <nav>
      <Dropdown>
        <Tooltip delay={0} closeDelay={0}>
          <Button type="button" variant="ghost" size="sm" isIconOnly className="md:hidden">
            <PanelRightIcon />
          </Button>
          <Tooltip.Content showArrow>
            <Tooltip.Arrow />
            <p>Navigation</p>
          </Tooltip.Content>
        </Tooltip>
        <Dropdown.Popover>
          <div className="px-3">
            <UserProfile />
          </div>
          <MobileNavMenu />
        </Dropdown.Popover>
      </Dropdown>
    </nav>
  );
}
