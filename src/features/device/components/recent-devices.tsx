import Link from "next/link";

import { Table } from "@heroui/react";

import { CircleIcon, DatabaseIcon, DatabaseZapIcon } from "lucide-react";

import { getDevices } from "@/dal/device";

import { getDeviceTypes } from "@/dal/type";

import { getDeviceGroups } from "@/dal/group";

import { getDeviceStatuses } from "@/dal/status";

import { TABLE_COLUMNS } from "@/features/device/lib/constants";

import { getBadgeIconColorClassesByStatus } from "@/features/device/lib/utils";

import { Badge } from "@/components/ui/badge";

import DeviceActions from "@/features/device/components/device-actions";

export default async function RecentDevices() {
  const { data, error } = await getDevices(5);

  const types = await getDeviceTypes();

  const statuses = await getDeviceStatuses();

  const groups = await getDeviceGroups();

  const hasNoData = !data?.length && data?.length === 0;

  return (
    <>
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-foreground font-semibold">Recent Devices</h2>
        <Badge>{data?.length ?? 0}</Badge>
      </div>
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Table of recent devices" className="min-w-200">
            <Table.Header>
              {TABLE_COLUMNS.map((tableColumn, idx) => {
                const key = `recent-devices-table-column-${idx}`;

                return (
                  <Table.Column key={key} isRowHeader={idx === 0}>
                    {tableColumn}
                  </Table.Column>
                );
              })}
            </Table.Header>
            <Table.Body>
              {error ? (
                <Table.Row>
                  <Table.Cell colSpan={TABLE_COLUMNS.length}>
                    <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
                      <DatabaseZapIcon className="text-muted size-6" />
                      <span className="text-muted text-sm">{error}</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : hasNoData ? (
                <Table.Row>
                  <Table.Cell colSpan={TABLE_COLUMNS.length}>
                    <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
                      <DatabaseIcon className="text-muted size-6" />
                      <span className="text-muted text-sm">No devices to display.</span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ) : (
                data?.map((device) => {
                  return (
                    <Table.Row key={device.id}>
                      <Table.Cell>
                        <Link
                          href="#"
                          className="focus-visible:outline-accent rounded-lg text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-8 dark:text-blue-300"
                        >
                          {device.name}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{device.type}</Table.Cell>
                      <Table.Cell>
                        <Badge variant="outline">
                          <CircleIcon
                            data-icon="inline-start"
                            className={getBadgeIconColorClassesByStatus(device.status)}
                          />
                          {device.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>{device.group}</Table.Cell>
                      <Table.Cell>{device.serialNumber}</Table.Cell>
                      <Table.Cell>
                        <DeviceActions
                          device={device}
                          types={types.data}
                          statuses={statuses.data}
                          groups={groups.data}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </>
  );
}
