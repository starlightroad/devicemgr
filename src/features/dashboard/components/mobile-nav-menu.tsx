"use client";

import Link from "next/link";

import { FolderGit2Icon, LogOutIcon } from "lucide-react";

import { GITHUB_REPO } from "@/lib/constants";

import { getNavIcon } from "@/features/dashboard/lib/utils";

import { mobileNavItems } from "@/features/dashboard/lib/config";

import useSignOut from "@/features/auth/hooks/use-sign-out";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function MobileNavMenu() {
  const { signOut } = useSignOut();

  return (
    <>
      {mobileNavItems.map((navItem) => {
        const Icon = getNavIcon(navItem.label);

        return (
          <DropdownMenuItem
            key={navItem.id}
            className="px-3 text-sm capitalize"
            render={
              <Link href={navItem.href}>
                <Icon />
                {navItem.label}
              </Link>
            }
          />
        );
      })}
      <DropdownMenuItem
        className="px-3 text-sm"
        render={
          <Link href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <FolderGit2Icon />
            GitHub
          </Link>
        }
      />
      <DropdownMenuItem onClick={async () => await signOut()} className="px-3 text-sm">
        <LogOutIcon />
        Sign Out
      </DropdownMenuItem>
    </>
  );
}
