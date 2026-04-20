"use server";

import { z } from "zod";

import { and, eq, sql } from "drizzle-orm";

import { revalidatePath } from "next/cache";

import { db } from "@/db/client";

import { getSession } from "@/dal/session";

import { devicesTable } from "@/db/schemas";

import { DeleteDeviceSchema, EditDeviceSchema, MoveDeviceSchema } from "@/features/device/lib/schemas";

import type { DeleteDeviceAction, EditDeviceAction, MoveDeviceAction } from "@/features/device/lib/definitions";

export const updateDevice = async (deviceId: string, _prevState: unknown, formData: FormData): EditDeviceAction => {
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
        success: false,
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
      success: false,
      serverErrors: {
        ipAddress: "A server error has occurred.",
      },
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    serverErrors: null,
  };
};

export const moveDevice = async (deviceId: string, _prevState: unknown, formData: FormData): MoveDeviceAction => {
  try {
    const { userId } = await getSession();

    const parsedFields = MoveDeviceSchema.safeParse({
      groupId: formData.get("group"),
    });

    if (!parsedFields.success) {
      const { fieldErrors } = z.flattenError(parsedFields.error);

      return {
        success: false,
        serverErrors: {
          group: fieldErrors.groupId?.toString(),
        },
      };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(devicesTable)
        .set({
          groupId: sql`(SELECT id FROM device_groups WHERE id = ${parsedFields.data.groupId} AND user_id = ${userId})`,
        })
        .where(eq(devicesTable.id, deviceId));
    });
  } catch {
    return {
      success: false,
      serverErrors: {
        group: "A server error has occurred.",
      },
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    serverErrors: null,
  };
};

export const deleteDevice = async (deviceId: string): DeleteDeviceAction => {
  try {
    const { userId } = await getSession();

    const parsedDeviceId = DeleteDeviceSchema.safeParse(deviceId);

    if (!parsedDeviceId.success) {
      return {
        success: false,
        serverErrors: {
          message: "Failed to delete device.",
        },
      };
    }

    await db.transaction(async (tx) => {
      await tx.delete(devicesTable).where(and(eq(devicesTable.id, deviceId), eq(devicesTable.userId, userId)));
    });
  } catch {
    return {
      success: false,
      serverErrors: {
        message: "A server error has occurred.",
      },
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    serverErrors: null,
  };
};
