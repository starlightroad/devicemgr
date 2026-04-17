import type { ChipVariants } from "@heroui/styles";

import type { Device } from "@/features/device";

export const getChipColorByStatus = (status: string): ChipVariants["color"] => {
  switch (status) {
    case "In Use":
      return "success";
    case "Storage":
      return "warning";
    case "Decommissioned":
      return "danger";
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
