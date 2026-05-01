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
        <ButtonGroup className="w-full py-5">
          <ButtonGroup>
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
          <ButtonActions />
        </ButtonGroup>
      </main>
    </>
  );
}
