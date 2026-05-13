import { Suspense } from "react";

import type { Metadata } from "next";

import { getDeviceTypes } from "@/dal/type";

import { getDeviceGroups } from "@/dal/group";

import { getDeviceStatuses } from "@/dal/status";

import { validatePageSize } from "@/features/device/lib/utils";

import { DEFAULT_PAGE, DEVICES_DESCRIPTION, DEVICES_TITLE } from "@/features/device/lib/constants";

import { ButtonGroup } from "@/components/ui/button-group";

import SearchProvider from "@/features/device/providers/search-provider";

import DeviceTable from "@/features/device/components/device-table";

import ButtonActions from "@/features/device/components/button-actions";

import FilterPopover from "@/features/device/components/filter-popover";

import DeviceSearchBar from "@/features/device/components/device-search-bar";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import ClearFilterButton from "@/features/device/components/clear-filter-button";

import DeviceTableSkeleton from "@/features/device/components/device-table-skeleton";

import FilterButtonSkeleton from "@/features/device/components/filter-button-skeleton";

type DevicesPageProps = {
  searchParams: Promise<{
    type?: string | string[];
    status?: string | string[];
    group?: string | string[];
    page?: string;
    pageSize?: string;
    q?: string;
    sortBy?: string;
    sortDirection?: string;
  }>;
};

export const metadata: Metadata = {
  title: DEVICES_TITLE,
  description: DEVICES_DESCRIPTION,
};

export default async function DevicesPage({ searchParams }: DevicesPageProps) {
  const params = await searchParams;

  const query = params.q ?? "";
  const types = params.type?.toString() ?? "";
  const statuses = params.status?.toString() ?? "";
  const groups = params.group?.toString() ?? "";
  const sortBy = params.sortBy ?? "";
  const sortDirection = params.sortDirection ?? "";
  const page = Number(params.page) ?? DEFAULT_PAGE;
  const pageSize = validatePageSize(Number(params.pageSize));

  const typesPromise = getDeviceTypes();
  const statusesPromise = getDeviceStatuses();
  const groupsPromise = getDeviceGroups();

  return (
    <>
      <Header>
        <HeaderTitle>Devices</HeaderTitle>
      </Header>
      <main>
        <SearchProvider>
          <div className="flex justify-end pb-5 lg:hidden">
            <ButtonActions />
          </div>
          <ButtonGroup className="w-full sm:pb-5">
            <ButtonGroup aria-label="Search Bar Group" className="hidden sm:flex">
              <DeviceSearchBar />
            </ButtonGroup>
            <ButtonGroup aria-label="Type Group">
              <Suspense fallback={<FilterButtonSkeleton />}>
                <FilterPopover label="Type" items={typesPromise} />
              </Suspense>
            </ButtonGroup>
            <ButtonGroup aria-label="Status Group">
              <Suspense fallback={<FilterButtonSkeleton />}>
                <FilterPopover label="Status" items={statusesPromise} />
              </Suspense>
            </ButtonGroup>
            <ButtonGroup aria-label="Group Group">
              <Suspense fallback={<FilterButtonSkeleton />}>
                <FilterPopover label="Group" items={groupsPromise} />
              </Suspense>
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
        </SearchProvider>
        <Suspense fallback={<DeviceTableSkeleton />}>
          <DeviceTable
            query={query}
            types={types}
            statuses={statuses}
            groups={groups}
            sortBy={sortBy}
            sortDirection={sortDirection}
            page={page}
            pageSize={pageSize}
          />
        </Suspense>
      </main>
    </>
  );
}
