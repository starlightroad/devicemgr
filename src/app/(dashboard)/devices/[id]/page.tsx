import Link from "next/link";

import { notFound } from "next/navigation";

import { ChevronRightIcon, MonitorSmartphoneIcon, MoreHorizontalIcon } from "lucide-react";

import { getDeviceById } from "@/dal/device";

import { DEVICES_PATH } from "@/features/dashboard/lib/constants";

import { NOT_FOUND_DESCRIPTION, NOT_FOUND_TITLE } from "@/lib/constants";

import { getBadgeIconColorClassesByStatus } from "@/features/device/lib/utils";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { ButtonGroup } from "@/components/ui/button-group";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DevicePageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: DevicePageProps) => {
  const { id } = await params;

  const { data, error } = await getDeviceById(id);

  if (!data || error) {
    return {
      title: NOT_FOUND_TITLE,
      description: NOT_FOUND_DESCRIPTION,
    };
  }

  return {
    title: data.name,
    description: `View and manage device information for ${data.name}.`,
  };
};

export default async function DevicePage({ params }: DevicePageProps) {
  const { id } = await params;

  const { data, error } = await getDeviceById(id);

  if (!data || error) {
    notFound();
  }

  const deviceInfoItems = [
    { label: "Type", value: data.type },
    { label: "Group", value: data.group },
    { label: "Serial Number", value: data.serialNumber },
    { label: "IP Address", value: data.ipAddress || "Not Assigned" },
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
                <Link href={DEVICES_PATH} className="text-muted-foreground">
                  Devices
                </Link>
              </li>
              <li>
                <ChevronRightIcon className="text-muted-foreground size-3.5" />
              </li>
              <li className="max-w-60">
                <span className="truncate">{data.name}</span>
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
                <CardTitle>{data.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className={getBadgeIconColorClassesByStatus(data.status.toLowerCase())}>{data.status}</Badge>
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
