"use client";

import { SearchIcon } from "lucide-react";

import useSearchBar from "@/features/device/hooks/use-search-bar";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function DeviceSearchBar() {
  const searchBar = useSearchBar();

  const handleChange = (value: string) => {
    searchBar?.setQuery(value);
    searchBar?.handleSearch(value);
  };

  return (
    <InputGroup>
      <InputGroupInput
        type="search"
        placeholder="Search..."
        value={searchBar?.query}
        onChange={(e) => handleChange(e.target.value)}
      />
      <InputGroupAddon align={undefined}>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
