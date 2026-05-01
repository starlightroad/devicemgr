import typesJson from "@/lib/data/device-types.json";

import groupsJson from "@/lib/data/device-groups.json";

import statusesJson from "@/lib/data/device-statuses.json";

import { ButtonGroup } from "@/components/ui/button-group";

import ButtonActions from "@/features/device/components/button-actions";

import FilterPopover from "@/features/device/components/filter-popover";

import DeviceSearchBar from "@/features/device/components/device-search-bar";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

export default function DevicesPage() {
  return (
    <>
      <Header>
        <HeaderTitle>Devices</HeaderTitle>
      </Header>
      <main>
        <div className="flex justify-end pb-5 lg:hidden">
          <ButtonActions />
        </div>
        <ButtonGroup className="w-full sm:pb-5">
          <ButtonGroup className="hidden sm:flex">
            <DeviceSearchBar />
          </ButtonGroup>
          <ButtonGroup>
            <FilterPopover label="Type" items={typesJson.map(({ name }) => name)} />
          </ButtonGroup>
          <ButtonGroup>
            <FilterPopover label="Status" items={statusesJson.map(({ name }) => name)} />
          </ButtonGroup>
          <ButtonGroup>
            <FilterPopover label="Group" items={groupsJson.map(({ name }) => name)} />
          </ButtonGroup>
          <ButtonGroup className="hidden lg:flex lg:grow lg:justify-end">
            <ButtonActions />
          </ButtonGroup>
        </ButtonGroup>
        <ButtonGroup className="w-full pt-2 pb-5 sm:hidden">
          <DeviceSearchBar />
        </ButtonGroup>
      </main>
    </>
  );
}
