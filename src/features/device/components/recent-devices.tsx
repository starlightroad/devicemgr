import Link from "next/link";

import { Button, Chip, Table } from "@heroui/react";

import { DatabaseIcon, DatabaseZapIcon, MoreVerticalIcon } from "lucide-react";

import { getDevices } from "@/dal/device";

import { getChipColorByStatus, TABLE_COLUMNS } from "@/features/device";

export default async function RecentDevices() {
  const { data, error } = await getDevices();

  const hasNoData = !data?.length && data?.length === 0;

  return (
    <>
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-foreground font-semibold">Recent Devices</h2>
        <Chip>{data?.length ?? 0}</Chip>
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
                        <Chip color={getChipColorByStatus(device.status)} size="sm" variant="soft">
                          {device.status}
                        </Chip>
                      </Table.Cell>
                      <Table.Cell>{device.group}</Table.Cell>
                      <Table.Cell>{device.serialNumber}</Table.Cell>
                      <Table.Cell>
                        <Button type="button" variant="outline" size="sm" isIconOnly aria-label="Actions">
                          <MoreVerticalIcon />
                        </Button>
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
