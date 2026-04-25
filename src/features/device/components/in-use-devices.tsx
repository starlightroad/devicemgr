import { ZapIcon } from "lucide-react";

import { getDevicesCountByStatus } from "@/dal/device";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function InUseDevices() {
  const { data, error } = await getDevicesCountByStatus("in use");

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        <ZapIcon className="text-muted size-4" />
        <CardTitle className="text-muted">In Use</CardTitle>
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
