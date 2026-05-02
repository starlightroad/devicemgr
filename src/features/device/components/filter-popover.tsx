"use client";

import { useState } from "react";

import { ChevronDownIcon } from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  items: string[];
};

export default function FilterPopover({ label, items }: FilterPopoverProps) {
  const pathname = usePathname();

  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const anchor = useComboboxAnchor();

  const [value, setValue] = useState<string[]>(searchParams.getAll(label.toLowerCase()));

  const updateQueryString = (values: typeof value) => {
    const params = new URLSearchParams(searchParams);

    const query = label.toLowerCase();

    params.delete(query);

    if (values.length) {
      values.forEach((value) => params.append(query, value));
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleValueChange = (values: typeof value) => {
    updateQueryString(values);
    setValue(values);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" className="border-dashed">
            {label}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent align="start" className="bg-background">
        <Combobox multiple autoHighlight items={items} value={value} onValueChange={handleValueChange}>
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
