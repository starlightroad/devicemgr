import { Suspense } from "react";

import { Card } from "@heroui/react";

import { MobileNav } from "@/features/dashboard";

import {
  DecommissionedDevices,
  DeviceStatSkeleton,
  InUseDevices,
  RecentDevices,
  StorageDevices,
  TotalDevices,
} from "@/features/device";

export default function DashboardPage() {
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
        <section>
          <article>
            <RecentDevices />
          </article>
        </section>
        <article>
          <Card>
            <Card.Header>
              <Card.Title>Map</Card.Title>
              <Card.Description>A map of your devices.</Card.Description>
            </Card.Header>
          </Card>
        </article>
      </main>
    </>
  );
}
