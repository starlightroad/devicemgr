import Link from "next/link";

import { FolderGit2Icon } from "lucide-react";

import { GITHUB_REPO } from "@/lib/constants";

import { navItems } from "@/features/dashboard/lib/config";

import { buttonVariants } from "@/components/ui/button";

import NavList from "@/features/dashboard/components/nav-list";

import UserProfile from "@/features/dashboard/components/user-profile";

import SignOutButton from "@/features/dashboard/components/sign-out-button";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-full max-h-screen flex-col overflow-auto border-r md:flex">
      <UserProfile />
      <NavList items={navItems} />
      <div className="mt-auto flex flex-col py-4">
        <Link
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ size: "lg", variant: "ghost", className: "justify-start gap-3 px-3" })}
        >
          <FolderGit2Icon className="text-muted-foreground" />
          <span className="text-sm">GitHub</span>
        </Link>
        <SignOutButton />
      </div>
    </aside>
  );
}
