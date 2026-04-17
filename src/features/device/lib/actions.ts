"use server";

import { z } from "zod";

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

export const updateDevice = async (_previousState: PreviousState | undefined, formData: FormData) => {
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

    // Update the resource
  } catch {
    return {
      serverErrors: {
        ipAddress: "A server error has occurred.",
      },
    };
  }
};
