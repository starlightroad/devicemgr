import Link from "next/link";

import { getSessionFromHomePage } from "@/dal/session";

import { buttonVariants } from "@/components/ui/button";

export async function CTA() {
  const session = await getSessionFromHomePage();
  const isUserLoggedIn = Boolean(session.userId);

  return (
    <Link href={isUserLoggedIn ? "/dashboard" : "/login"} className={buttonVariants({ size: "sm" })}>
      {isUserLoggedIn ? "Go to dashboard" : "Log in"}
    </Link>
  );
}

export function CTASkeleton() {
  return <div className="h-8 w-16 animate-pulse rounded-lg bg-neutral-200"></div>;
}
