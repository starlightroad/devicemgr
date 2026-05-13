export const TABLE_COLUMNS = ["Name", "Type", "Status", "Group", "Serial Number", ""];

export const FORM_ID = "device-form";

export const FORM_FIELD = {
  NAME: { id: "name", placeholder: "John's MacBook Pro" },
  TYPE: { id: "type-id", placeholder: "Select a type" },
  STATUS: { id: "status-id", placeholder: "Select a group" },
  GROUP: { id: "group-id", placeholder: "Select a status" },
  SERIAL_NUMBER: { id: "serial-number", placeholder: "SN-LTP-1001" },
  IP_ADDRESS: { id: "ip-address", placeholder: "192.168.1.10" },
};

export const ACTION_MESSAGE = {
  created: null,
  updated: "The device was successfully updated.",
  moved: "The device was successfully moved.",
  deleted: "The device was successfully deleted.",
  copied: "The device ID was successfully copied to the clipboard.",
};

export const SORT_BY_PARAM_ID = "sortBy";

export const SORT_DIRECTION_PARAM_ID = "sortDirection";

export const PAGE_PARAM_ID = "page";

export const PAGE_SIZES: readonly number[] = [10, 25, 50, 100];

export const PAGE_SIZE_PARAM_ID = "pageSize";

export const DEFAULT_PAGE = 1;

export const DEFAULT_PAGE_SIZE = PAGE_SIZES[0];
