import { Card } from "@heroui/react";

import { HistoryIcon } from "lucide-react";

import { getDevicesCountByStatus } from "@/dal/device";

export default async function DecommissionedDevices() {
  const { data, error } = await getDevicesCountByStatus("decommissioned");

  return (
    <Card>
      <Card.Header className="flex-row items-center gap-2">
        <HistoryIcon className="text-muted size-4" />
        <Card.Title className="text-muted">Decommissioned</Card.Title>
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
