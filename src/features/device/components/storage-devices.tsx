import { PackageIcon } from "lucide-react";

import { getDevicesCountByStatus } from "@/dal/device";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function StorageDevices() {
  const { data, error } = await getDevicesCountByStatus("storage");

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        <PackageIcon className="text-muted size-4" />
        <CardTitle className="text-muted">Storage</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-foreground mb-4 text-center text-base">{error}</p>
        ) : (
          <p className="text-foreground text-4xl font-semibold">{data}</p>
        )}
      </CardContent>
    </Card>
  );
}
