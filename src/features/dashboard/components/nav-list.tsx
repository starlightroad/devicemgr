"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { listboxItemVariants, listboxVariants } from "@heroui/react";

import { getNavIcon, type NavItem } from "@/features/dashboard";

export default function NavList({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul aria-label="Navigation" className={listboxVariants()}>
        {items.map((navItem) => {
          const Icon = getNavIcon(navItem.label);
          const slots = listboxItemVariants();
          const isActive = pathname.startsWith(navItem.href);

          return (
            <li key={navItem.id}>
              <Link
                href={navItem.href}
                className={slots.item({
                  className: `${isActive ? "bg-default" : ""} focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2`,
                })}
              >
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
