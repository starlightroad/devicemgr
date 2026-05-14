import Link from "next/link";

import { ChevronRightIcon, MonitorSmartphoneIcon, MoreHorizontalIcon } from "lucide-react";

import devicesJson from "@/lib/data/devices.json";

import { getBadgeIconColorClassesByStatus } from "@/features/device/lib/utils";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { ButtonGroup } from "@/components/ui/button-group";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DevicePage() {
  const device = devicesJson[0];

  const deviceInfoItems = [
    { label: "Type", value: device.device_type },
    { label: "Group", value: device.device_group },
    { label: "Serial Number", value: device.serial_number },
    { label: "IP Address", value: device.ip_address },
  ];

  return (
    <div className="mx-auto md:max-w-xl">
      <Header>
        <HeaderTitle>Device Details</HeaderTitle>
      </Header>
      <main className="flex flex-col gap-5 pb-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <nav>
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/devices" className="text-muted-foreground">
                  Devices
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="text-muted-foreground size-3.5" />
              </li>
              <li className="max-w-60">
                <span className="truncate">{device.name}</span>
              </li>
            </ol>
          </nav>
          <ButtonGroup>
            <Button type="button" variant="outline">
              Edit Device
            </Button>
            <Button type="button" variant="outline" size="icon">
              <MoreHorizontalIcon />
            </Button>
          </ButtonGroup>
        </div>
        <article>
          <Card className="flex-row items-center gap-0">
            <div className="pl-3">
              <div className="bg-accent flex h-12 w-12 items-center justify-center">
                <MonitorSmartphoneIcon />
              </div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <CardHeader>
                <CardTitle>{device.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getBadgeIconColorClassesByStatus(device.device_status.toLowerCase())}>
                  {device.device_status}
                </Badge>
              </CardContent>
            </div>
          </Card>
        </article>
        <article>
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-2 text-sm">
                {deviceInfoItems.map((deviceInfoItem) => (
                  <li key={deviceInfoItem.value}>
                    <strong className="font-medium">{deviceInfoItem.label}</strong>: {deviceInfoItem.value}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </article>
      </main>
    </div>
  );
}
