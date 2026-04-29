"use client";

import { useTheme } from "@wrksz/themes/client";

import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <MoonIcon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-neutral-100" />
          </Button>
        }
      />
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
