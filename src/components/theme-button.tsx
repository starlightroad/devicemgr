"use client";

import { Button, Tooltip } from "@heroui/react";

import { useTheme } from "@wrksz/themes/client";

import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Tooltip delay={0} closeDelay={0}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        isIconOnly
        aria-label="Toggle theme"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <SunIcon className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <MoonIcon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-neutral-100" />
      </Button>
      <Tooltip.Content offset={12} showArrow>
        <Tooltip.Arrow />
        <p>Toggle theme</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
