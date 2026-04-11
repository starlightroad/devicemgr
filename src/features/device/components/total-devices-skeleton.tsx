import { Card, Skeleton } from "@heroui/react";

export default function TotalDevicesSkeleton() {
  return (
    <Card className="h-auto min-h-60">
      <Card.Header>
        <Card.Title>
          <Skeleton className="h-6 w-24 rounded-lg" />
        </Card.Title>
      </Card.Header>
      <Card.Content className="items-center justify-center">
        <Skeleton className="mb-10 h-14 w-32 rounded" />
      </Card.Content>
    </Card>
  );
}
