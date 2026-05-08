"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { getDeviceTableColumns } from "@/features/device/lib/utils";

import { TableHead } from "@/components/ui/table";

type DeviceTableColumnsProps = ReturnType<typeof getDeviceTableColumns>;

export default function DeviceTableColumns({ columns }: { columns: DeviceTableColumnsProps }) {
  const [sortBy, setSortBy] = useState<{ name: string; direction: "asc" | "desc" } | null>(null);

  return columns.map((tableColumn) => {
    const isActionsColumn = tableColumn.toLowerCase() === "actions";

    const handleSort = (value: string) => {
      setSortBy((prevState) => ({
        name: value.toLowerCase(),
        direction: prevState?.direction === "asc" ? "desc" : "asc",
      }));
    };

    const isSortedColumn = tableColumn.toLowerCase() === sortBy?.name;

    return (
      <TableHead
        key={tableColumn}
        className={cn("cursor-pointer px-4", isActionsColumn ? "text-right" : "")}
        onClick={!isActionsColumn ? (e) => handleSort(e.currentTarget.innerText) : undefined}
      >
        <div className="flex items-center gap-1">
          <span className={isActionsColumn ? "sr-only" : ""}>{tableColumn}</span>
          {!isActionsColumn && isSortedColumn && <SortIcon direction={sortBy?.direction} />}
        </div>
      </TableHead>
    );
  });
}

function SortIcon({ direction }: { direction?: "asc" | "desc" }) {
  return direction === "asc" ? <ChevronDownIcon className="size-3" /> : <ChevronUpIcon className="size-3" />;
}
