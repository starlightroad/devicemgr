import { Card } from "@heroui/react";

import { PackageIcon } from "lucide-react";

import { getDevicesCountByStatus } from "@/dal/device";

export default async function StorageDevices() {
  const { data, error } = await getDevicesCountByStatus("storage");

  return (
    <Card>
      <Card.Header className="flex-row items-center gap-2">
        <PackageIcon className="text-muted size-4" />
        <Card.Title className="text-muted">Storage</Card.Title>
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
