import { Card, Skeleton } from "@heroui/react";

export default function DeviceStatSkeleton() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <Skeleton className="h-6 w-24 rounded-lg" />
        </Card.Title>
      </Card.Header>
      <Card.Content>
        <Skeleton className="h-10 w-32 rounded" />
      </Card.Content>
    </Card>
  );
}
