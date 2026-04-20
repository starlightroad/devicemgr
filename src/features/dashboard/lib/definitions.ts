export type NavItem = {
  id: string;
  label: NavItemLabel;
  href: string;
};

export type NavItemLabel = "dashboard" | "devices" | "profile";
