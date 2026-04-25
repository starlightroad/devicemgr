import { CpuIcon } from "lucide-react";

import { getDevicesCount } from "@/dal/device";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TotalDevices() {
  const { data: devicesCount, error } = await getDevicesCount();

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-2">
        <CpuIcon className="text-muted size-4" />
        <CardTitle className="text-muted">Total Devices</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-foreground mb-4 text-center text-base">{error}</p>
        ) : (
          <p className="text-foreground text-4xl font-semibold">{devicesCount}</p>
        )}
      </CardContent>
    </Card>
  );
}
