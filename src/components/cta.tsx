import Link from "next/link";

import { getSession } from "@/dal/session";

export async function CTA() {
  const session = await getSession();
  const isUserLoggedIn = Boolean(session.userId);

  return (
    <Link
      href={isUserLoggedIn ? "/dashboard" : "/login"}
      className="flex h-8 items-center justify-center rounded-lg bg-neutral-800 px-3 text-sm leading-6 font-medium text-white outline-0 select-none hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400"
    >
      {isUserLoggedIn ? "Go to dashboard" : "Log in"}
    </Link>
  );
}

export function CTASkeleton() {
  return <div className="h-8 w-16 animate-pulse rounded-lg bg-neutral-200"></div>;
}
