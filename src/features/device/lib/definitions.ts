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

export type TableColumn =
  | "id"
  | "name"
  | "type"
  | "status"
  | "group"
  | "serialNumber"
  | "ipAddress"
  | "createdAt"
  | "updatedAt"
  | "actions";

export type TableColumnItem = {
  id: TableColumn;
  header: string;
};
