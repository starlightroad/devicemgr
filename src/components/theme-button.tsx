"use client";

import { useState } from "react";

import { Button } from "@base-ui/react";

import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeButton() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Button
      type="button"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setDarkMode(!darkMode)}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-800 outline-0 select-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-400"
    >
      {darkMode ? <MoonIcon size={16} className="" /> : <SunIcon size={16} />}
    </Button>
  );
}
