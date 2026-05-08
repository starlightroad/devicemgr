"use client";

import { use, useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { ActionResult } from "@/lib/definitions";

import { getFilteredSearchParams } from "@/features/device/lib/utils";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

type FilterPopoverProps = {
  label: string;
  items: Promise<ActionResult<{ id: string; name: string }[]>>;
};

export default function FilterPopover({ label, items }: FilterPopoverProps) {
  const { data } = use(items);

  const newItems = data?.map(({ name }) => name) ?? [];

  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const anchor = useComboboxAnchor();

  const [popoverOpen, setPopoverOpen] = useState(false);

  const iconStyles = `${popoverOpen ? "rotate-180" : "rotate-0"} transition-transform`;

  const searchParamsValues = getFilteredSearchParams(searchParams.getAll(label.toLowerCase()), newItems);

  const updateQueryString = (values: typeof searchParamsValues) => {
    const params = new URLSearchParams(searchParams);

    const query = label.toLowerCase();

    params.delete(query);

    if (values.length) {
      values.forEach((value) => params.append(query, value.toLowerCase()));
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover onOpenChange={setPopoverOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="border-dashed">
            {label}
            <ChevronDownIcon data-icon="inline-end" className={iconStyles} />
          </Button>
        }
      />
      <PopoverContent align="start" className="bg-background">
        <Combobox
          multiple
          autoHighlight
          items={newItems}
          value={searchParamsValues}
          onValueChange={(value) => updateQueryString(value)}
        >
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {(values) => (
                <>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput type="search" />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </PopoverContent>
    </Popover>
  );
}
