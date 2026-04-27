import type { Device } from "@/features/device/lib/definitions";

export const getBadgeIconColorClassesByStatus = (status: string) => {
  switch (status) {
    case "in use":
      return "bg-green-700 dark:bg-green-300";
    case "storage":
      return "bg-amber-700 dark:bg-amber-300";
    case "decommissioned":
      return "bg-purple-700 dark:bg-purple-300";
    default:
      throw new Error("Invalid status.");
  }
};

export const generateId = (value: string, separator: string = "-") => value.toLowerCase().split(" ").join(separator);

export const generateDeviceFieldIds = (data: Device) => ({
  id: { name: "id", value: data.id },
  name: { name: "name", value: data.name },
  serialNumber: { name: "serial-number", value: data.serialNumber },
  ipAddress: { name: "ip-address", value: data.ipAddress ?? "" },
  type: { name: "type", value: "" },
  status: { name: "status", value: "" },
  group: { name: "group", value: "" },
});
