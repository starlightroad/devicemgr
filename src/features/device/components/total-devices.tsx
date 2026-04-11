import { Card } from "@heroui/react";

import { getDevicesCount } from "@/dal/device";

export default async function TotalDevices() {
  const { data: devicesCount, error } = await getDevicesCount();

  return (
    <Card className="h-auto min-h-60">
      <Card.Header>
        <Card.Title>Total Devices</Card.Title>
      </Card.Header>
      <Card.Content className="items-center justify-center">
        {error ? (
          <p className="text-muted mb-10 text-center text-base">{error}</p>
        ) : (
          <p className="text-muted mb-10 text-6xl font-semibold">{devicesCount}</p>
        )}
      </Card.Content>
    </Card>
  );
}
