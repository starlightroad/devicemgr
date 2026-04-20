import { devicesTable } from "@/db/schemas";

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
