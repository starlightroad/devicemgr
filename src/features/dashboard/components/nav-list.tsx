"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { getNavIcon } from "@/features/dashboard/lib/utils";

import type { NavItem } from "@/features/dashboard/lib/definitions";

import { buttonVariants } from "@/components/ui/button";

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
              <Link
                href={navItem.href}
                className={buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: cn("w-full justify-start px-3", isActive ? "bg-muted/50" : ""),
                })}
              >
                <Icon className={cn("h-4 w-4", !isActive ? "text-muted-foreground" : "")} />
                <span className="text-sm font-medium capitalize">{navItem.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
