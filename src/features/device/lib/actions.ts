"use server";

import { z } from "zod";

import { eq, sql } from "drizzle-orm";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import { devicesTable } from "@/db/schemas";

import { EditDeviceSchema } from "@/features/device";

type PreviousState = {
  serverErrors?: Partial<{
    name: string;
    type: string;
    status: string;
    group: string;
    ipAddress: string;
    serialNumber: string;
  }>;
};

export const updateDevice = async (deviceId: string, _previousState: PreviousState | undefined, formData: FormData) => {
  const { userId } = await getSession();

  const parsedFields = EditDeviceSchema.safeParse({
    name: formData.get("name"),
    typeId: formData.get("type"),
    statusId: formData.get("status"),
    groupId: formData.get("group"),
    ipAddress: formData.get("ip-address"),
    serialNumber: formData.get("serial-number"),
  });

  try {
    if (!parsedFields.success) {
      const { fieldErrors } = z.flattenError(parsedFields.error);

      return {
        serverErrors: {
          name: fieldErrors.name?.toString(),
          type: fieldErrors.typeId?.toString(),
          status: fieldErrors.statusId?.toString(),
          group: fieldErrors.groupId?.toString(),
          ipAddress: fieldErrors.ipAddress?.toString(),
          serialNumber: fieldErrors.serialNumber?.toString(),
        },
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(devicesTable)
        .set({
          name: parsedFields.data.name,
          typeId: sql`(SELECT id FROM device_types WHERE id = ${parsedFields.data.typeId} AND user_id = ${userId})`,
          statusId: sql`(SELECT id FROM device_statuses WHERE id = ${parsedFields.data.statusId} AND user_id = ${userId})`,
          groupId: sql`(SELECT id FROM device_groups WHERE id = ${parsedFields.data.groupId} AND user_id = ${userId})`,
          ipAddress: parsedFields.data.ipAddress,
          serialNumber: parsedFields.data.serialNumber,
        })
        .where(eq(devicesTable.id, deviceId));
    });
  } catch {
    return {
      serverErrors: {
        ipAddress: "A server error has occurred.",
      },
    };
  }
};
