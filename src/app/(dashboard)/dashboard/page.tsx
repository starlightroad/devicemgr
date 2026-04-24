import { Suspense } from "react";

import { Card } from "@heroui/react";

import { getDeviceCountsByType } from "@/dal/type";

import { getDeviceCountsByGroup } from "@/dal/group";

import MobileNav from "@/features/dashboard/components/mobile-nav";

import TotalDevices from "@/features/device/components/total-devices";

import InUseDevices from "@/features/device/components/in-use-devices";

import RecentDevices from "@/features/device/components/recent-devices";

import StorageDevices from "@/features/device/components/storage-devices";

import DeviceStatSkeleton from "@/features/device/components/device-stat-skeleton";

import DevicesByTypeChart from "@/features/device/components/devices-by-type-chart";

import DevicesByGroupChart from "@/features/device/components/devices-by-group-chart";

import DecommissionedDevices from "@/features/device/components/decommissioned-devices";

export default async function DashboardPage() {
  const [groupDeviceCounts, typeDeviceCounts] = await Promise.all([getDeviceCountsByGroup(), getDeviceCountsByType()]);

  return (
    <>
      <header className="flex items-center justify-between py-5">
        <h1 className="font-semibold">Dashboard</h1>
        <MobileNav />
      </header>
      <main className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
        <section className="grid gap-5 lg:grid-cols-2">
          <article>
            <Card className="h-full gap-4">
              <Card.Header>
                <Card.Title className="text-base font-medium">Devices by Group</Card.Title>
              </Card.Header>
              <Card.Content>
                {groupDeviceCounts.data ? (
                  <DevicesByGroupChart chartData={groupDeviceCounts.data} />
                ) : (
                  <p className="text-danger text-sm">{groupDeviceCounts.error}</p>
                )}
              </Card.Content>
            </Card>
          </article>
          <article>
            <Card className="h-full gap-4">
              <Card.Header>
                <Card.Title className="text-base font-medium">Devices by Type</Card.Title>
              </Card.Header>
              <Card.Content>
                {typeDeviceCounts.data ? (
                  <DevicesByTypeChart chartData={typeDeviceCounts.data} />
                ) : (
                  <p className="text-danger text-sm">{typeDeviceCounts.error}</p>
                )}
              </Card.Content>
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
