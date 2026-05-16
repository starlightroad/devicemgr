"use client";

import { usePathname } from "next/navigation";

export default function NotFoundMessage() {
  const pathname = usePathname();

  return (
    <p className="mb-5 text-sm">
      The resource <code className="bg-accent rounded px-1.5 py-0.5">{pathname}</code> was not found.
    </p>
  );
}
