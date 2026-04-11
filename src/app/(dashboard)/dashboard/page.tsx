import { Suspense } from "react";

import { Card } from "@heroui/react";

import { MobileNav } from "@/features/dashboard";

import { TotalDevices, TotalDevicesSkeleton } from "@/features/device";

export default function DashboardPage() {
  return (
    <>
      <header className="flex items-center justify-between py-5">
        <h1 className="font-semibold">Dashboard</h1>
        <MobileNav />
      </header>
      <main className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <article>
            <Suspense fallback={<TotalDevicesSkeleton />}>
              <TotalDevices />
            </Suspense>
          </article>
          <article>
            <Card>
              <Card.Header>
                <Card.Title>Health Status</Card.Title>
                <Card.Description>Everything looks good.</Card.Description>
              </Card.Header>
            </Card>
          </article>
        </div>
        <article>
          <Card>
            <Card.Header>
              <Card.Title>Recent Devices</Card.Title>
              <Card.Description>You have no devices saved.</Card.Description>
            </Card.Header>
          </Card>
        </article>
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
