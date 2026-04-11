import { Card } from "@heroui/react";

import { getDevicesCount } from "@/dal/device";

export default async function TotalDevices() {
  const devicesCount = await getDevicesCount();

  return (
    <Card className="h-auto min-h-60">
      <Card.Header>
        <Card.Title>Total Devices</Card.Title>
      </Card.Header>
      <Card.Content className="items-center justify-center">
        <p className="text-muted mb-10 text-6xl font-semibold">{devicesCount}</p>
      </Card.Content>
    </Card>
  );
}
