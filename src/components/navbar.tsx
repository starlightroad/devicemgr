"use client";

import Link from "next/link";

import { useState } from "react";

import { Button } from "@base-ui/react";

import { MonitorSmartphoneIcon, MoonIcon, SunIcon } from "lucide-react";

import { APP_NAME } from "@/lib/contants";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

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
          <Button
            type="button"
            title="Toggle theme"
            aria-label="Toggle theme"
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-800 outline-0 select-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400"
          >
            {darkMode ? <MoonIcon size={16} className="" /> : <SunIcon size={16} />}
          </Button>
          <Link
            href="/login"
            className="flex h-8 items-center justify-center rounded-lg bg-neutral-800 px-3 text-sm leading-6 font-medium text-white outline-0 select-none hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
