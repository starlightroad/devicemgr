import { navItems, NavList, UserProfile } from "@/features/dashboard";

export default function Sidebar() {
  return (
    <aside className="hidden h-full flex-col border-r px-4 md:flex">
      <UserProfile />
      <NavList items={navItems} />
    </aside>
  );
}
