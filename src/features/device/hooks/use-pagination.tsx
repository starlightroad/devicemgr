"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PAGE_PARAM_ID } from "@/features/device/lib/constants";

type UsePaginationProps = {
  totalPages: number;
};

export default function usePagination({ totalPages }: UsePaginationProps) {
  const { push } = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get(PAGE_PARAM_ID)) || 1;

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page === 1) {
      params.delete(PAGE_PARAM_ID);
    } else {
      params.set(PAGE_PARAM_ID, page.toString());
    }

    push(`${pathname}?${params.toString()}`);
  };

  return {
    page: currentPage,
    goToFirstPage: () => updatePage(1),
    goToPreviousPage: () => updatePage(currentPage - 1),
    goToNextPage: () => updatePage(currentPage + 1),
    goToLastPage: () => updatePage(totalPages),
  };
}
