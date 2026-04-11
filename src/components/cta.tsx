import Link from "next/link";

import { buttonVariants } from "@heroui/react";

import { getSessionFromHomePage } from "@/dal/session";

export async function CTA() {
  const session = await getSessionFromHomePage();
  const isUserLoggedIn = Boolean(session.userId);

  return (
    <Link
      href={isUserLoggedIn ? "/dashboard" : "/login"}
      className={buttonVariants({
        size: "sm",
        className:
          "focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2",
      })}
    >
      {isUserLoggedIn ? "Go to dashboard" : "Log in"}
    </Link>
  );
}

export function CTASkeleton() {
  return <div className="h-8 w-16 animate-pulse rounded-lg bg-neutral-200"></div>;
}
