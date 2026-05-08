import Link from "next/link";

import { getDevices } from "@/dal/device";

import { cn } from "@/lib/utils";

import type { Options } from "@/lib/definitions";

import { getDeviceTableColumns } from "@/features/device/lib/utils";

import { getBadgeIconColorClassesByStatus } from "@/features/device/lib/utils";

import { Badge } from "@/components/ui/badge";

import { buttonVariants } from "@/components/ui/button";

import DeviceActions from "@/features/device/components/device-actions";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import {
  NoResultsFoundRow,
  NoResultsFoundDescription,
  NoResultsFoundIcon,
} from "@/features/device/components/no-results-found-row";

type DeviceTableProps = {
  query: string;
  types: string;
  statuses: string;
  groups: string;
};

export default async function DeviceTable({ query, types, statuses, groups }: DeviceTableProps) {
  const options: Options = {
    filters: { query, type: types, status: statuses, group: groups },
  };

  const { data, error } = await getDevices(options);

  const columns = getDeviceTableColumns();

  return (
    <div className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((tableColumn) => {
              const isActionsColumn = tableColumn.toLowerCase() === "actions";

              return (
                <TableHead key={tableColumn} className={cn("px-4", isActionsColumn ? "text-right" : "")}>
                  <span className={isActionsColumn ? "sr-only" : ""}>{tableColumn}</span>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(error || !data?.length) && (
            <NoResultsFoundRow columns={columns.length}>
              <NoResultsFoundIcon />
              <NoResultsFoundDescription>No devices to display.</NoResultsFoundDescription>
            </NoResultsFoundRow>
          )}
          {data?.map((device) => {
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
                <TableCell>{device.ipAddress ?? "-"}</TableCell>
                <TableCell align="right">
                  <DeviceActions device={device} types={[]} statuses={[]} groups={[]} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
