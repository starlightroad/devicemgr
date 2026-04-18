import { devicesTable } from "@/db/schemas";

export type Device = Pick<typeof devicesTable.$inferSelect, "id" | "name" | "serialNumber" | "ipAddress"> & {
  type: string;
  status: string;
  group: string;
};

export type EditDeviceModalProps = { device: Device; onClose: () => void };

export type MoveDeviceModalProps = { deviceId: string; deviceGroup: string; onClose: () => void };

export type ShareDeviceModalProps = Pick<MoveDeviceModalProps, "deviceId" | "onClose">;

export type DeleteDeviceModalProps = Pick<MoveDeviceModalProps, "deviceId" | "onClose"> & { deviceName: string };
