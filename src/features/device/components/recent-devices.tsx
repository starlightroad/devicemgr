import Link from "next/link";

import { DatabaseIcon, DatabaseZapIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { getDevices } from "@/dal/device";

import { getDeviceTypes } from "@/dal/type";

import { getDeviceGroups } from "@/dal/group";

import { getDeviceStatuses } from "@/dal/status";

import { TABLE_COLUMNS } from "@/features/device/lib/constants";

import { getBadgeIconColorClassesByStatus } from "@/features/device/lib/utils";

import { Badge } from "@/components/ui/badge";

import { buttonVariants } from "@/components/ui/button";

import DeviceActions from "@/features/device/components/device-actions";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function RecentDevices() {
  const { data, error } = await getDevices(5);

  const types = await getDeviceTypes();

  const statuses = await getDeviceStatuses();

  const groups = await getDeviceGroups();

  const hasNoData = !data?.length && data?.length === 0;

  return (
    <>
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-foreground font-semibold">Recent Devices</h2>
        <Badge variant="secondary">{data?.length ?? 0}</Badge>
      </div>
      <div className="overflow-hidden border">
        <Table>
          <TableHeader>
            <TableRow>
              {TABLE_COLUMNS.map((tableColumn) => {
                const isActionsColumn = tableColumn.toLowerCase() === "actions";

                return (
                  <TableHead key={tableColumn} className={cn("px-4", isActionsColumn ? "text-right" : "")}>
                    {tableColumn}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length}>
                  <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
                    <DatabaseZapIcon className="text-muted size-6" />
                    <span className="text-muted text-sm">{error}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : hasNoData ? (
              <TableRow>
                <TableCell colSpan={TABLE_COLUMNS.length}>
                  <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
                    <DatabaseIcon className="text-muted size-6" />
                    <span className="text-muted text-sm">No devices to display.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((device) => {
                return (
                  <TableRow key={device.id} className="[&>td]:px-4">
                    <TableCell>
                      <Link href="#" className={cn(buttonVariants({ variant: "link", size: "sm" }), "px-0 underline")}>
                        {device.name}
                      </Link>
                    </TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            getBadgeIconColorClassesByStatus(device.status.toLowerCase()),
                          )}
                        />
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{device.group}</TableCell>
                    <TableCell>{device.serialNumber}</TableCell>
                    <TableCell align="right">
                      <DeviceActions device={device} types={types.data} statuses={statuses.data} groups={groups.data} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
