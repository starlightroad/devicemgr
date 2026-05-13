import type { Metadata } from "next";

import { getDeviceTypes } from "@/dal/type";

import { getDeviceGroups } from "@/dal/group";

import { getDeviceStatuses } from "@/dal/status";

import { createSelectFieldItems } from "@/features/device/lib/helpers";

import { NEW_DEVICE_DESCRIPTION, NEW_DEVICE_TITLE } from "@/features/device/lib/constants";

import NewDeviceCard from "@/features/device/components/new-device-card";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

export const metadata: Metadata = {
  title: NEW_DEVICE_TITLE,
  description: NEW_DEVICE_DESCRIPTION,
};

export default async function NewDevicePage() {
  const [types, statuses, groups] = await Promise.all([getDeviceTypes(), getDeviceStatuses(), getDeviceGroups()]);

  return (
    <div className="mx-auto max-w-xl">
      <Header>
        <HeaderTitle>Add New Device</HeaderTitle>
      </Header>
      <main className="pb-5">
        <NewDeviceCard
          types={createSelectFieldItems(types.data)}
          statuses={createSelectFieldItems(statuses.data)}
          groups={createSelectFieldItems(groups.data)}
        />
      </main>
    </div>
  );
}
