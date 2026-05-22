"use client";

import { cn } from "@/lib/utils";

import { ChevronUpIcon } from "lucide-react";

import type { SortDirection, TableColumnItem } from "@/features/device/lib/definitions";

import useSort from "@/features/device/hooks/use-sort";

import { TableHead } from "@/components/ui/table";

export default function DeviceTableColumns({ columns }: { columns: TableColumnItem[] }) {
  const { sort, handleSort } = useSort();

  return columns.map((tableColumn) => {
    const isActionsColumn = tableColumn.id === "actions";

    const isSortedColumn = tableColumn.header.toLowerCase() === sort?.name;

    return (
      <TableHead
        key={tableColumn.id}
        className={cn("px-4", isActionsColumn ? "text-right" : "hover:bg-accent cursor-pointer")}
        onClick={!isActionsColumn ? (e) => handleSort(e.currentTarget.innerText) : undefined}
      >
        <div className="flex items-center gap-1">
          <span className={isActionsColumn ? "sr-only" : undefined}>{tableColumn.header}</span>
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
