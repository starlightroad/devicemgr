"use client";

import { FunnelXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ClearFilterButton() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const clearFilters = () => replace(pathname);

  if (!searchParams.size) {
    return false;
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button type="button" variant="ghost" size="icon" aria-label="Clear filters" onClick={clearFilters}>
            <FunnelXIcon className="border-dashed" />
          </Button>
        }
      />
      <TooltipContent>
        <p>Clear filters</p>
      </TooltipContent>
    </Tooltip>
  );
}
