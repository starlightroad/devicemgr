import { HouseIcon, MonitorSmartphoneIcon, UserRoundIcon } from "lucide-react";

import type { NavItemLabel } from "@/features/dashboard/lib/definitions";

export const getNavIcon = (label: NavItemLabel) => {
  switch (label) {
    case "dashboard":
      return HouseIcon;
    case "devices":
      return MonitorSmartphoneIcon;
    case "profile":
      return UserRoundIcon;
    default:
      throw new Error("Unknown label");
  }
};

export const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((str) => str[0])
    .join("");
};
