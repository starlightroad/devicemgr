import type { ChipVariants } from "@heroui/styles";

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
