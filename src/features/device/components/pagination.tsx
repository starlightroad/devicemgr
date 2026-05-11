"use client";

import { use } from "react";

import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

import type { ActionResult } from "@/lib/definitions";

import { PAGE_SIZES } from "@/features/device/lib/constants";

import usePagination from "@/features/device/hooks/use-pagination";

import { Button } from "@/components/ui/button";

import { Field, FieldLabel } from "@/components/ui/field";

import { ButtonGroup } from "@/components/ui/button-group";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PaginationProps = {
  totalPagesPromise: Promise<ActionResult<number>>;
};

export default function Pagination({ totalPagesPromise }: PaginationProps) {
  const { data, error } = use(totalPagesPromise);

  const totalPages = data ?? 0;

  const { page, goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage } = usePagination({ totalPages });

  if (!data || error) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-6 border-x border-transparent p-4">
      <p className="text-sm">{`Page ${page} of ${totalPages}`}</p>
      <div className="flex items-center gap-6">
        <RowsPerPage />
        <ButtonGroup>
          <ButtonGroup className="hidden sm:flex">
            <Button type="button" variant="outline" size="icon" disabled={page === 1} onClick={goToFirstPage}>
              <ChevronsLeftIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="button" variant="outline" size="icon" disabled={page === 1} onClick={goToPreviousPage}>
              <ChevronLeftIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button type="button" variant="outline" size="icon" disabled={page === totalPages} onClick={goToNextPage}>
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="hidden sm:flex">
            <Button type="button" variant="outline" size="icon" disabled={page === totalPages} onClick={goToLastPage}>
              <ChevronsRightIcon />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </div>
  );
}

function RowsPerPage() {
  return (
    <Field orientation="horizontal" className="hidden w-auto sm:flex">
      <FieldLabel htmlFor="rows-per-page">Rows per page</FieldLabel>
      <Select defaultValue={PAGE_SIZES[0]}>
        <SelectTrigger id="rows-per-page" className="w-16">
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectGroup>
            {PAGE_SIZES.map((item) => {
              const key = `rows-per-page-${item}`;

              return (
                <SelectItem key={key} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  );
}
