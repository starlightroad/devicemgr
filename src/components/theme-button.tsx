"use client";

import { Button } from "@base-ui/react";

import { useTheme } from "@wrksz/themes/client";

import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-800 outline-0 select-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400"
    >
      <SunIcon className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-neutral-100" />
    </Button>
  );
}
