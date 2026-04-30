import { Suspense } from "react";

import { getDeviceCountsByGroup } from "@/dal/group";

import TotalDevices from "@/features/device/components/total-devices";

import InUseDevices from "@/features/device/components/in-use-devices";

import RecentDevices from "@/features/device/components/recent-devices";

import StorageDevices from "@/features/device/components/storage-devices";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import DeviceStatSkeleton from "@/features/device/components/device-stat-skeleton";

import DevicesByGroupChart from "@/features/device/components/devices-by-group-chart";

import DecommissionedDevices from "@/features/device/components/decommissioned-devices";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const groupDeviceCounts = await getDeviceCountsByGroup();

  return (
    <>
      <Header>
        <HeaderTitle>Dashboard</HeaderTitle>
      </Header>
      <main className="flex flex-col gap-5 pb-5">
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article>
            <Suspense fallback={<DeviceStatSkeleton />}>
              <TotalDevices />
            </Suspense>
          </article>
          <article>
            <Suspense fallback={<DeviceStatSkeleton />}>
              <InUseDevices />
            </Suspense>
          </article>
          <article>
            <Suspense fallback={<DeviceStatSkeleton />}>
              <StorageDevices />
            </Suspense>
          </article>
          <article>
            <Suspense fallback={<DeviceStatSkeleton />}>
              <DecommissionedDevices />
            </Suspense>
          </article>
        </section>
        <section>
          <article>
            <Card className="h-full gap-4">
              <CardHeader>
                <CardTitle>Devices by Group</CardTitle>
              </CardHeader>
              <CardContent>
                {groupDeviceCounts.data ? (
                  <DevicesByGroupChart chartData={groupDeviceCounts.data} />
                ) : (
                  <p className="text-danger text-sm">{groupDeviceCounts.error}</p>
                )}
              </CardContent>
            </Card>
          </article>
        </section>
        <section>
          <article>
            <RecentDevices />
          </article>
        </section>
      </main>
    </>
  );
}
