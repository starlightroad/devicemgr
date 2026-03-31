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
      {resolvedTheme === "dark" ? <MoonIcon size={16} className="" /> : <SunIcon size={16} />}
    </Button>
  );
}
