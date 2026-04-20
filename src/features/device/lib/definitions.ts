import { devicesTable } from "@/db/schemas";

import type { ActionReturnType } from "@/lib/definitions";

export type Device = Pick<typeof devicesTable.$inferSelect, "id" | "name" | "serialNumber" | "ipAddress"> & {
  type: string;
  status: string;
  group: string;
};

export type DeviceType = Pick<Device, "id" | "name">;

export type DeviceStatus = Pick<Device, "id" | "name">;

export type EditDeviceModalProps = {
  device: Device;
  types: { id: string; name: string }[] | null;
  groups: { id: string; name: string }[];
  statuses: { id: string; name: string }[] | null;
  onClose: () => void;
};

export type MoveDeviceModalProps = {
  deviceId: string;
  deviceGroup: string;
  groups: { id: string; name: string }[];
  onClose: () => void;
};

export type ShareDeviceModalProps = Pick<MoveDeviceModalProps, "deviceId" | "onClose">;

export type DeleteDeviceModalProps = Pick<MoveDeviceModalProps, "deviceId" | "onClose"> & { deviceName: string };

export type DeleteDeviceAction = ActionReturnType<{ serverError?: string }>;

export type EditDeviceAction = ActionReturnType<{
  serverErrors?: Partial<{
    name: string;
    type: string;
    status: string;
    group: string;
    ipAddress: string;
    serialNumber: string;
  }>;
}>;

export type MoveDeviceAction = ActionReturnType<{ serverErrors?: Partial<{ group: string }> }>;
