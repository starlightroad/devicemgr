import { NextResponse } from "next/server";

import { getDevices } from "@/dal/device";

import { getSession } from "@/dal/session";

import { MAX_ROWS } from "@/lib/constants";

import { createFileName } from "@/features/device/lib/utils";

import type { Device } from "@/features/device/lib/definitions";

import { DEFAULT_PAGE_SIZE } from "@/features/device/lib/constants";

const TABLE_COLUMNS = [
  { id: "id", header: "ID" },
  { id: "name", header: "Name" },
  { id: "type", header: "Type" },
  { id: "status", header: "Status" },
  { id: "group", header: "Group" },
  { id: "serialNumber", header: "Serial Number" },
  { id: "ipAddress", header: "IP Address" },
  { id: "createdAt", header: "Created At" },
  { id: "updatedAt", header: "Updated At" },
];

const generateDeviceRow = (device: Device) => {
  const { id, name, type, status, group, serialNumber, ipAddress } = device;
  return `${id},${name},${type},${status},${group},${serialNumber},${ipAddress ?? ""}\n`;
};

export const GET = async () => {
  await getSession();

  const headers = TABLE_COLUMNS.map((tableColumn) => tableColumn.header);

  const header = `${headers.join(",")}\n`;

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      controller.enqueue(encoder.encode(header));

      let page = 1;

      let hasMoreData = true;

      while (hasMoreData) {
        const { data } = await getDevices({
          pagination: {
            limit: MAX_ROWS,
            offset: (page - 1) * DEFAULT_PAGE_SIZE,
          },
        });

        if (!data || data.length === 0) {
          hasMoreData = false;
          break;
        }

        for (const device of data) {
          const row = generateDeviceRow(device);

          controller.enqueue(encoder.encode(row));
        }

        page += 1;
      }

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=${createFileName()}.csv`,
    },
  });
};
