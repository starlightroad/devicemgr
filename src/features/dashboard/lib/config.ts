import { DASHBOARD_PATH, DEVICES_PATH, type NavItem, PROFILE_PATH } from "@/features/dashboard";

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
