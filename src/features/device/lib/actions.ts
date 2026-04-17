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
    type: formData.get("type"),
    status: formData.get("status"),
    group: formData.get("group"),
    ipAddress: formData.get("ip-address"),
    serialNumber: formData.get("serial-number"),
  });

  try {
    if (!parsedFields.success) {
      const { fieldErrors } = z.flattenError(parsedFields.error);

      return {
        serverErrors: {
          name: fieldErrors.name?.toString(),
          type: fieldErrors.type?.toString(),
          status: fieldErrors.status?.toString(),
          group: fieldErrors.group?.toString(),
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
