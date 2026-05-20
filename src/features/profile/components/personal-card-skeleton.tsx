import { Skeleton } from "@/components/ui/skeleton";

import { Separator } from "@/components/ui/separator";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PersonalCardSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-4 w-full max-w-28" />
        <Skeleton className="h-3 w-full max-w-48" />
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="w-full space-y-2">
            <Skeleton className="h-3 w-full max-w-10" />
            <Skeleton className="h-3 w-full max-w-20" />
          </div>
          <Skeleton className="h-8 w-full max-w-20" />
        </div>
        <Separator className="my-5" />
        <div className="flex">
          <div className="w-full space-y-2">
            <Skeleton className="h-3 w-full max-w-10" />
            <Skeleton className="h-3 w-full max-w-32" />
          </div>
          <Skeleton className="h-8 w-full max-w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
