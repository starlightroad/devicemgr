import { DEVICES_PATH } from "@/features/dashboard/lib/constants";

import type { TableColumn } from "@/features/device/lib/definitions";

import { DEFAULT_PAGE_SIZE, PAGE_SIZES, TABLE_COLUMNS } from "@/features/device/lib/constants";

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

export const getFilteredSearchParams = (searchParams: string[], values: string[]) => {
  const validatedSearchParams: string[] = [];

  searchParams.forEach((searchParam) => {
    const [filteredValue] = values.filter((value) => value.toLowerCase() === searchParam.toLowerCase());
    if (filteredValue) validatedSearchParams.push(filteredValue);
  });

  return validatedSearchParams;
};

export const validatePageSize = (pageSize: number) => {
  if (PAGE_SIZES.includes(pageSize)) {
    return pageSize;
  }

  return DEFAULT_PAGE_SIZE;
};

export const createDeviceUrlById = (deviceId: string) => `${DEVICES_PATH}/${deviceId}`;

export const createFileName = () => `devices-export-${new Date().toISOString()}`;

export const getTableColumns = (...columns: TableColumn[]) => {
  const selectedColumns = [];

  for (const column of columns) {
    const selectedColumn = TABLE_COLUMNS.filter((tableColumn) => tableColumn.id === column);
    selectedColumns.push(selectedColumn[0]);
  }

  return selectedColumns;
};
