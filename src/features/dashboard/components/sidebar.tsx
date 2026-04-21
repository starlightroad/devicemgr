import Link from "next/link";

import { FolderGit2Icon } from "lucide-react";

import { buttonVariants, Separator } from "@heroui/react";

import { GITHUB_REPO } from "@/lib/constants";

import { navItems } from "@/features/dashboard/lib/config";

import NavList from "@/features/dashboard/components/nav-list";

import UserProfile from "@/features/dashboard/components/user-profile";

import SignOutButton from "@/features/dashboard/components/sign-out-button";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-full max-h-screen flex-col overflow-auto border-r px-4 md:flex">
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
        <SignOutButton />
      </div>
    </aside>
  );
}
