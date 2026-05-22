import { cn } from "@/lib/utils";

import { getTableColumns } from "@/features/device/lib/utils";

import { Skeleton } from "@/components/ui/skeleton";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DeviceTableSkeleton() {
  const tableColumns = getTableColumns("name", "type", "status", "group", "serialNumber", "ipAddress", "actions");

  const rows = new Array(8).fill(null);

  return (
    <div className="overflow-hidden border">
      <Table>
        <TableHeader>
          <TableRow>
            {tableColumns.map((tableColumn) => {
              const isActionsColumn = tableColumn.id === "actions";

              return (
                <TableHead key={tableColumn.id} className={cn("px-4", isActionsColumn ? "text-right" : "")}>
                  <span className={isActionsColumn ? "sr-only" : ""}>{tableColumn.header}</span>
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((_, idx) => {
            return (
              <TableRow key={`device-table-skeleton-row-${idx}`} className="[&>td]:px-4">
                {tableColumns.map((_, idx) => (
                  <TableCell key={`device-table-skeleton-cell-${idx}`} className="h-10" align="right">
                    <Skeleton className={cn("h-3 w-full", `${idx === tableColumns.length - 1 ? "w-6" : ""}`)} />
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
