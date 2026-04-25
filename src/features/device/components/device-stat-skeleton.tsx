import { Skeleton } from "@heroui/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeviceStatSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-24 rounded-lg" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-32 rounded" />
      </CardContent>
    </Card>
  );
}
