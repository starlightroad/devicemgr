import Link from "next/link";

import { FolderGit2Icon, LogOutIcon } from "lucide-react";

import { Button, buttonVariants, Separator } from "@heroui/react";

import { GITHUB_REPO } from "@/lib/constants";

import { navItems, NavList, UserProfile } from "@/features/dashboard";

export default function Sidebar() {
  return (
    <aside className="hidden h-full flex-col border-r px-4 md:flex">
      <UserProfile />
      <NavList items={navItems} />
      <Separator className="my-1" />
      <div className="mt-auto flex flex-col gap-1 px-1 py-5">
        <Link
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "ghost", size: "sm", fullWidth: true, className: "justify-start" })}
        >
          <FolderGit2Icon className="text-muted size-4" />
          GitHub
        </Link>
        <Button type="button" variant="ghost" size="sm" fullWidth className="justify-start">
          <LogOutIcon className="text-muted size-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
