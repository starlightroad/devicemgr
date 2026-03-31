import Link from "next/link";

import { Suspense } from "react";

import { MonitorSmartphoneIcon } from "lucide-react";

import { APP_NAME } from "@/lib/contants";

import { CTA, CTASkeleton } from "@/components/cta";

import ThemeButton from "@/components/theme-button";

export default function Navbar() {
  return (
    <header className="h-14 border-b border-neutral-200 px-4">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="flex h-8 items-center gap-2 rounded-lg px-2 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400"
        >
          <MonitorSmartphoneIcon size={16} className="text-neutral-800" />
          <span className="text-sm font-medium text-neutral-800">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeButton />
          <Suspense fallback={<CTASkeleton />}>
            <CTA />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
