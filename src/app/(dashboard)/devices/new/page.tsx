import Link from "next/link";

import { getDeviceTypes } from "@/dal/type";

import { getDeviceGroups } from "@/dal/group";

import { getDeviceStatuses } from "@/dal/status";

import { FORM_ID } from "@/features/device/lib/constants";

import { DEVICES_PATH } from "@/features/dashboard/lib/constants";

import { createSelectFieldItems } from "@/features/device/lib/helpers";

import { Button, buttonVariants } from "@/components/ui/button";

import NewDeviceForm from "@/features/device/components/new-device-form";

import { Header, HeaderTitle } from "@/features/dashboard/components/header";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NewDevicePage() {
  const [types, statuses, groups] = await Promise.all([getDeviceTypes(), getDeviceStatuses(), getDeviceGroups()]);

  return (
    <div className="mx-auto max-w-xl">
      <Header>
        <HeaderTitle>Add New Device</HeaderTitle>
      </Header>
      <main className="pb-5">
        <Card>
          <CardHeader>
            <CardTitle>Device Information</CardTitle>
            <CardDescription>Fill out the following fields to create a new device.</CardDescription>
          </CardHeader>
          <CardContent>
            <NewDeviceForm
              types={createSelectFieldItems(types.data)}
              statuses={createSelectFieldItems(statuses.data)}
              groups={createSelectFieldItems(groups.data)}
            />
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Link href={DEVICES_PATH} className={buttonVariants({ variant: "outline" })}>
              Cancel
            </Link>
            <Button form={FORM_ID} type="submit">
              Create Device
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
