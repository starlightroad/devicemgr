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
          <DropdownMenuItem key={navItem.id} className="capitalize">
            <Link href={navItem.href}>
              <Icon />
              {navItem.label}
            </Link>
          </DropdownMenuItem>
        );
      })}
      <DropdownMenuItem>
        <Link href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
          <FolderGit2Icon />
          GitHub
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onClick={async () => await signOut()}>
        <LogOutIcon />
        Sign Out
      </DropdownMenuItem>
    </>
  );
}
