import type { NavItem } from "@/features/dashboard/lib/definitions";

import { DASHBOARD_PATH, DEVICES_PATH, PROFILE_PATH } from "@/features/dashboard/lib/constants";

export const navItems: NavItem[] = [
  {
    id: "sidebar-nav-item-0",
    label: "dashboard",
    href: DASHBOARD_PATH,
  },
  {
    id: "sidebar-nav-item-1",
    label: "devices",
    href: DEVICES_PATH,
  },
  {
    id: "sidebar-nav-item-2",
    label: "profile",
    href: PROFILE_PATH,
  },
];

export const mobileNavItems: NavItem[] = navItems.map((navItem) => ({
  ...navItem,
  id: navItem.id.replace("sidebar", "mobile"),
}));
