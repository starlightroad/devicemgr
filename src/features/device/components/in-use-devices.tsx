import { ZapIcon } from "lucide-react";

import { getDevicesCountByStatus } from "@/dal/device";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function InUseDevices() {
  const { data, error } = await getDevicesCountByStatus("in use");

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <ZapIcon className="text-muted-foreground size-4" />
        <CardTitle className="text-foreground">In Use</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-destructive mb-4">{error}</p>
        ) : (
          <p className="text-foreground text-4xl font-semibold">{data}</p>
        )}
      </CardContent>
    </Card>
  );
}
