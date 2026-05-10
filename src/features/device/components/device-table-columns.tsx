"use client";

import { cn } from "@/lib/utils";

import { useState } from "react";

import { ChevronUpIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getDeviceTableColumns } from "@/features/device/lib/utils";

import type { SortDirection } from "@/features/device/lib/definitions";

import { SORT_BY_PARAM_ID, SORT_DIRECTION_PARAM_ID } from "@/features/device/lib/constants";

import { TableHead } from "@/components/ui/table";

type DeviceTableColumnsProps = ReturnType<typeof getDeviceTableColumns>;

export default function DeviceTableColumns({ columns }: { columns: DeviceTableColumnsProps }) {
  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const getInitialState = () => {
    const sortBy = searchParams.get(SORT_BY_PARAM_ID) || "";
    const sortDirection = searchParams.get(SORT_DIRECTION_PARAM_ID) || "asc";

    if (!sortBy && !sortDirection) return null;

    return {
      name: sortBy,
      direction: sortDirection as SortDirection,
    };
  };

  const [sortBy, setSortBy] = useState<{ name: string; direction: SortDirection } | null>(getInitialState());

  return columns.map((tableColumn) => {
    const isActionsColumn = tableColumn.toLowerCase() === "actions";

    const handleSort = (value: string) => {
      const newSortByDirection = sortBy?.name === value.toLowerCase() && sortBy?.direction === "asc" ? "desc" : "asc";

      setSortBy({ name: value.toLowerCase(), direction: newSortByDirection });

      const params = new URLSearchParams(searchParams);

      params.set(SORT_BY_PARAM_ID, value.toLowerCase());

      params.set(SORT_DIRECTION_PARAM_ID, newSortByDirection);

      replace(`${pathname}?${params.toString()}`);
    };

    const isSortedColumn = tableColumn.toLowerCase() === sortBy?.name;

    return (
      <TableHead
        key={tableColumn}
        className={cn("px-4", isActionsColumn ? "text-right" : "hover:bg-accent cursor-pointer")}
        onClick={!isActionsColumn ? (e) => handleSort(e.currentTarget.innerText) : undefined}
      >
        <div className="flex items-center gap-1">
          <span className={isActionsColumn ? "sr-only" : undefined}>{tableColumn}</span>
          {!isActionsColumn && isSortedColumn && <SortIcon direction={sortBy.direction} />}
        </div>
      </TableHead>
    );
  });
}

function SortIcon({ direction }: { direction: SortDirection }) {
  const rotationStyle = direction === "asc" ? "rotate-0" : "rotate-180";

  return <ChevronUpIcon className={cn("size-3 transition-transform", rotationStyle)} />;
}
