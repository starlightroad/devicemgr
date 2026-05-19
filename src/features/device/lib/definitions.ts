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

export type PartialDevice = Omit<Device, "userId" | "typeId" | "statusId" | "groupId"> & {
  createdAt: Date;
  updatedAt: Date;
};

type DeviceIdAndName = Pick<Device, "id" | "name">;

export type DeviceItem = { id: string; name: string };

export type DeviceType = DeviceIdAndName;

export type DeviceStatus = DeviceIdAndName;

export type DeviceGroup = DeviceIdAndName;

export type BaseDeviceModalProps<T = object> = {
  deviceId: string;
  onClose: () => void;
} & T;

export type SortDirection = "asc" | "desc";

export type SelectFieldItem = {
  label: string;
  value: string;
};

export type DownloadData = Record<string, string>;
