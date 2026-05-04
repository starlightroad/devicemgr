import { getDeviceTypes } from "@/dal/type";

import { getDeviceGroups } from "@/dal/group";

import { getDeviceStatuses } from "@/dal/status";

import { ButtonGroup } from "@/components/ui/button-group";

import DeviceTable from "@/features/device/components/device-table";

import ButtonActions from "@/features/device/components/button-actions";

import FilterPopover from "@/features/device/components/filter-popover";

import DeviceSearchBar from "@/features/device/components/device-search-bar";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import ClearFilterButton from "@/features/device/components/clear-filter-button";

type DevicesPageProps = {
  searchParams: Promise<{
    type?: string;
    status?: string;
    group?: string;
    page?: string;
  }>;
};

export default async function DevicesPage({ searchParams }: DevicesPageProps) {
  const params = await searchParams;

  const types = params.type ?? "";
  const statuses = params.status ?? "";
  const groups = params.group ?? "";

  const typesPromise = getDeviceTypes();
  const statusesPromise = getDeviceStatuses();
  const groupsPromise = getDeviceGroups();

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
          <ButtonGroup aria-label="Search Bar Group" className="hidden sm:flex">
            <DeviceSearchBar />
          </ButtonGroup>
          <ButtonGroup aria-label="Type Group">
            <FilterPopover label="Type" items={typesPromise} />
          </ButtonGroup>
          <ButtonGroup aria-label="Status Group">
            <FilterPopover label="Status" items={statusesPromise} />
          </ButtonGroup>
          <ButtonGroup aria-label="Group Group">
            <FilterPopover label="Group" items={groupsPromise} />
          </ButtonGroup>
          <ButtonGroup>
            <ClearFilterButton />
          </ButtonGroup>
          <ButtonGroup className="hidden lg:flex lg:grow lg:justify-end">
            <ButtonActions />
          </ButtonGroup>
        </ButtonGroup>
        <ButtonGroup className="w-full pt-2 pb-5 sm:hidden">
          <DeviceSearchBar />
        </ButtonGroup>
        <DeviceTable types={types} statuses={statuses} groups={groups} />
      </main>
    </>
  );
}
