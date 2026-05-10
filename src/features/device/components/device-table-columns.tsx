"use client";

import { cn } from "@/lib/utils";

import { ChevronUpIcon } from "lucide-react";

import { getDeviceTableColumns } from "@/features/device/lib/utils";

import type { SortDirection } from "@/features/device/lib/definitions";

import useSort from "@/features/device/hooks/use-sort";

import { TableHead } from "@/components/ui/table";

type DeviceTableColumnsProps = ReturnType<typeof getDeviceTableColumns>;

export default function DeviceTableColumns({ columns }: { columns: DeviceTableColumnsProps }) {
  const { sort, handleSort } = useSort();

  return columns.map((tableColumn) => {
    const isActionsColumn = tableColumn.toLowerCase() === "actions";

    const isSortedColumn = tableColumn.toLowerCase() === sort?.name;

    return (
      <TableHead
        key={tableColumn}
        className={cn("px-4", isActionsColumn ? "text-right" : "hover:bg-accent cursor-pointer")}
        onClick={!isActionsColumn ? (e) => handleSort(e.currentTarget.innerText) : undefined}
      >
        <div className="flex items-center gap-1">
          <span className={isActionsColumn ? "sr-only" : undefined}>{tableColumn}</span>
          {!isActionsColumn && isSortedColumn && <SortIcon direction={sort.direction} />}
        </div>
      </TableHead>
    );
  });
}

function SortIcon({ direction }: { direction: SortDirection }) {
  const rotationStyle = direction === "asc" ? "rotate-0" : "rotate-180";

  return <ChevronUpIcon className={cn("size-3 transition-transform", rotationStyle)} />;
}
