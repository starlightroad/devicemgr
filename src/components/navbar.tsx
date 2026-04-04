import Link from "next/link";

import { Suspense } from "react";

import { buttonVariants } from "@heroui/react";

import { MonitorSmartphoneIcon } from "lucide-react";

import { APP_NAME } from "@/lib/constants";

import { CTA, CTASkeleton } from "@/components/cta";

import ThemeButton from "@/components/theme-button";

export default function Navbar() {
  return (
    <header className="h-14 border-b px-4">
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className:
              "focus-visible:ring-accent focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2",
          })}
        >
          <MonitorSmartphoneIcon size={16} />
          <span className="text-sm font-medium">{APP_NAME}</span>
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
