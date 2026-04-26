"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { getNavIcon } from "@/features/dashboard/lib/utils";

import type { NavItem } from "@/features/dashboard/lib/definitions";

type NavListProps = { items: NavItem[] };

export default function NavList({ items }: NavListProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul aria-label="Navigation">
        {items.map((navItem) => {
          const Icon = getNavIcon(navItem.label);
          const isActive = pathname.startsWith(navItem.href);

          return (
            <li key={navItem.id}>
              <Link href={navItem.href} className={isActive ? "bg-accent" : ""}>
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium capitalize">{navItem.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
