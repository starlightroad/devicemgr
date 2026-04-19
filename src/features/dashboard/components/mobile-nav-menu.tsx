"use client";

import Link from "next/link";

import { Dropdown, Label } from "@heroui/react";

import { FolderGit2Icon, LogOutIcon } from "lucide-react";

import { GITHUB_REPO } from "@/lib/constants";

import { getNavIcon } from "@/features/dashboard/lib/utils";

import { mobileNavItems } from "@/features/dashboard/lib/config";

import useSignOut from "@/features/auth/hooks/use-sign-out";

export default function MobileNavMenu() {
  const { signOut } = useSignOut();

  return (
    <Dropdown.Menu>
      {mobileNavItems.map((navItem) => {
        const Icon = getNavIcon(navItem.label);

        return (
          <Dropdown.Item
            key={navItem.id}
            textValue={navItem.label}
            className="capitalize"
            href={navItem.href}
            render={(props) => ("href" in props ? <Link {...props}></Link> : <div {...props}></div>)}
          >
            <Icon className="text-muted size-4" />
            <Label>{navItem.label}</Label>
          </Dropdown.Item>
        );
      })}
      <Dropdown.Item id="github" textValue="GitHub" href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
        <FolderGit2Icon className="text-muted size-4" />
        <Label>GitHub</Label>
      </Dropdown.Item>
      <Dropdown.Item id="signout" textValue="Sign Out" variant="danger" onAction={async () => await signOut()}>
        <LogOutIcon className="text-muted size-4" />
        <Label>Sign Out</Label>
      </Dropdown.Item>
    </Dropdown.Menu>
  );
}
