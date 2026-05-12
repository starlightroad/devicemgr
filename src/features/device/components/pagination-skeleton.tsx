"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PaginationSkeleton() {
  return (
    <div className="flex h-16 items-center justify-between gap-6 border-x border-transparent p-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16 sm:w-80" />
    </div>
  );
}
