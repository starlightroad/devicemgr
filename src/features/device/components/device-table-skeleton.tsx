import { cn } from "@/lib/utils";

import { getDeviceTableColumns } from "@/features/device/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DeviceTableSkeleton() {
  const columns = getDeviceTableColumns();
  const rows = new Array(8).fill(null);

  return (
    <div className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => {
              const isActionsColumn = column.toLowerCase() === "actions";

              return (
                <TableHead key={column} className={cn("px-4", isActionsColumn ? "text-right" : "")}>
                  <span className={isActionsColumn ? "sr-only" : ""}>{column}</span>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, idx) => {
            return (
              <TableRow key={`device-table-skeleton-row-${idx}`} className="[&>td]:px-4">
                {columns.map((_, idx) => (
                  <TableCell key={`device-table-skeleton-cell-${idx}`} className="h-10" align="right">
                    <Skeleton className={cn("h-3 w-full", `${idx === columns.length - 1 ? "w-6" : ""}`)} />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
