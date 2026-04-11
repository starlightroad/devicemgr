import { Card } from "@heroui/react";

import { ZapIcon } from "lucide-react";

import { getDevicesInUseCount } from "@/dal/device";

export default async function InUseDevices() {
  const { data, error } = await getDevicesInUseCount();

  return (
    <Card>
      <Card.Header className="flex-row items-center gap-2">
        <ZapIcon className="text-muted size-4" />
        <Card.Title className="text-muted">In Use</Card.Title>
      </Card.Header>
      <Card.Content>
        {error ? (
          <p className="text-foreground mb-4 text-center text-base">{error}</p>
        ) : (
          <p className="text-foreground text-4xl font-semibold">{data}</p>
        )}
      </Card.Content>
    </Card>
  );
}
