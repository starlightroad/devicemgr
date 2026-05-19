import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent } from "@/components/ui/card";

export default function UserCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex gap-2">
        <Skeleton className="size-8 shrink-0 rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="w-20_ h-3 w-full max-w-20" />
          <Skeleton className="w-40_ h-3 w-full max-w-40" />
        </div>
      </CardContent>
    </Card>
  );
}
