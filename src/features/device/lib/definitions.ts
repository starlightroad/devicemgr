import { devicesTable } from "@/db/schemas";

import type { ActionReturnType } from "@/lib/definitions";

export type Device = Pick<typeof devicesTable.$inferSelect, "id" | "name" | "serialNumber" | "ipAddress"> & {
  type: string;
  status: string;
  group: string;
};

type DeviceIdAndName = Pick<Device, "id" | "name">;

export type DeviceType = DeviceIdAndName;

export type DeviceStatus = DeviceIdAndName;

export type DeviceGroup = DeviceIdAndName;

export type BaseDeviceModalProps<T = object> = {
  deviceId: string;
  onClose: () => void;
} & T;

export type DeleteDeviceAction = ActionReturnType<{ message: string }>;

export type EditDeviceAction = ActionReturnType<
  Partial<{
    name: string;
    type: string;
    status: string;
    group: string;
    ipAddress: string;
    serialNumber: string;
  }>
>;

export type MoveDeviceAction = ActionReturnType<Partial<{ group: string }>>;
