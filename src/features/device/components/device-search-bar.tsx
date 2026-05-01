"use client";

import { SearchIcon } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function DeviceSearchBar() {
  return (
    <div>
      <InputGroup>
        <InputGroupInput id="input-device-query" type="search" placeholder="Search..." />
        <InputGroupAddon align={undefined}>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
