import { PanelRightIcon } from "lucide-react";

import { Button, Dropdown } from "@heroui/react";

import { MobileNavMenu, UserProfile } from "@/features/dashboard";

export default function MobileNav() {
  return (
    <nav>
      <Dropdown>
        <Button type="button" variant="ghost" size="sm" isIconOnly className="md:hidden">
          <PanelRightIcon />
        </Button>
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
