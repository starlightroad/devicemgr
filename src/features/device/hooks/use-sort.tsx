"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { SortDirection } from "@/features/device/lib/definitions";

import { SORT_BY_PARAM_ID, SORT_DIRECTION_PARAM_ID } from "@/features/device/lib/constants";

export default function useSort() {
  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const sort = {
    name: searchParams.get(SORT_BY_PARAM_ID) || "",
    direction: (searchParams.get(SORT_DIRECTION_PARAM_ID) as SortDirection) || "asc",
  };

  const handleSort = (value: string) => {
    const newSortByDirection = sort?.name === value.toLowerCase() && sort?.direction === "asc" ? "desc" : "asc";

    const params = new URLSearchParams(searchParams);

    params.set(SORT_BY_PARAM_ID, value.toLowerCase());

    params.set(SORT_DIRECTION_PARAM_ID, newSortByDirection);

    replace(`${pathname}?${params.toString()}`);
  };

  return {
    sort,
    handleSort,
  };
}
