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

export type MoveDeviceModalProps = {
  deviceId: string;
  deviceGroup: string;
  groups: DeviceGroup[] | null;
  onClose: () => void;
};

export type ShareDeviceModalProps = Pick<MoveDeviceModalProps, "deviceId" | "onClose">;

export type DeleteDeviceModalProps = Pick<MoveDeviceModalProps, "deviceId" | "onClose"> & { deviceName: string };

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
