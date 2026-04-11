import { Card } from "@heroui/react";

import { CpuIcon } from "lucide-react";

import { getDevicesCount } from "@/dal/device";

export default async function TotalDevices() {
  const { data: devicesCount, error } = await getDevicesCount();

  return (
    <Card>
      <Card.Header className="flex-row items-center gap-2">
        <CpuIcon className="text-muted size-4" />
        <Card.Title className="text-muted">Total Devices</Card.Title>
      </Card.Header>
      <Card.Content>
        {error ? (
          <p className="text-foreground mb-4 text-center text-base">{error}</p>
        ) : (
          <p className="text-foreground text-4xl font-semibold">{devicesCount}</p>
        )}
      </Card.Content>
    </Card>
  );
}
