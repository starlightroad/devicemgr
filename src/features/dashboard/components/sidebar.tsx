import { navItems, NavList } from "@/features/dashboard";

export default function Sidebar() {
  return (
    <aside className="hidden h-full flex-col border-r px-4 md:flex">
      <UserProfile />
      <NavList items={navItems} />
    </aside>
  );
}

function UserProfile() {
  return (
    <div className="py-5">
      <p>Demo User</p>
    </div>
  );
}
