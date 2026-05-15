import Link from "next/link";

import type { Metadata } from "next";

import { HOME_PATH, NOT_FOUND_DESCRIPTION, NOT_FOUND_TITLE } from "@/lib/constants";

import { buttonVariants } from "@/components/ui/button";

import NotFoundMessage from "@/components/not-found-message";

export const metadata: Metadata = {
  title: NOT_FOUND_TITLE,
  description: NOT_FOUND_DESCRIPTION,
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-xl px-5">
      <header className="py-5">
        <h1 className="font-semibold">{NOT_FOUND_TITLE}</h1>
      </header>
      <main>
        <NotFoundMessage />
        <Link href={HOME_PATH} className={buttonVariants({ className: "mb-5" })}>
          Go back to the home page
        </Link>
      </main>
    </div>
  );
}
