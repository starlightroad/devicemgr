import { z } from "zod";

export const EditDeviceSchema = z.object({
  name: z.string().min(1, "Name is required.").max(255, "Name is too long."),
  typeId: z.string().min(1, "Type is required.").max(255, "Type is too long."),
  statusId: z.string().min(1, "Status is required.").max(255, "Status is too long."),
  groupId: z.string().min(1, "Group is required").max(255, "Group is too long."),
  serialNumber: z.string().min(1, "Serial number is required.").max(64, "Serial Number is too long."),
  ipAddress: z.union([z.string().max(0), z.ipv4()], "Invalid IP address."),
});

export const MoveDeviceSchema = EditDeviceSchema.pick({
  groupId: true,
});
