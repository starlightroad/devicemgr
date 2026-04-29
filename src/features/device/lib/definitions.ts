export type Device = {
  id: string;
  typeId: string;
  statusId: string;
  groupId: string;
  name: string;
  type: string;
  status: string;
  group: string;
  serialNumber: string;
  ipAddress: string | null;
};

type DeviceIdAndName = Pick<Device, "id" | "name">;

export type DeviceType = DeviceIdAndName;

export type DeviceStatus = DeviceIdAndName;

export type DeviceGroup = DeviceIdAndName;

export type BaseDeviceModalProps<T = object> = {
  deviceId: string;
  onClose: () => void;
} & T;
