import { sql } from "drizzle-orm";

import { camelCase } from "@/lib/utils";

import type { Options } from "@/lib/definitions";

import { deviceGroupsTable, devicesTable, deviceStatusesTable, deviceTypesTable } from "@/db/schemas";

const getTableColumn = (column: string) => {
  switch (column) {
    case "name":
      return devicesTable.name;
    case "type":
      return deviceTypesTable.name;
    case "status":
      return deviceStatusesTable.name;
    case "group":
      return deviceGroupsTable.name;
    case "serialNumber":
      return devicesTable.serialNumber;
    case "ipAddress":
      return devicesTable.ipAddress;
  }
};

export const getSqlOrderByStatementBySort = (sort: Options["sort"]) => {
  if (!sort?.column) return sql`${devicesTable.createdAt} ASC`;

  const sortDirection = sort.direction || "asc";

  const columnName = camelCase(sort.column);

  return sql`${getTableColumn(columnName)} ${sortDirection === "asc" ? sql`ASC` : sql`DESC`}`;
};

export const getSqlWhereStatementByFilters = (filters: Options["filters"]) => {
  let query = sql``;

  if (!filters) return query;

  Object.entries(filters).forEach((filter) => {
    const [key, value] = filter;

    if (key === "query") {
      const partialQuery = sql.join([`%${filters.query}%`]);
      const deviceNameQuery = sql`${getTableColumn("name")} ILIKE ${partialQuery}`;
      const deviceTypeQuery = sql`${getTableColumn("type")} ILIKE ${partialQuery}`;
      const deviceStatusQuery = sql`${getTableColumn("status")} ILIKE ${partialQuery}`;
      const deviceGroupQuery = sql`${getTableColumn("group")} ILIKE ${partialQuery}`;
      const deviceSerialNumberQuery = sql`${getTableColumn("serialNumber")} ILIKE ${partialQuery}`;
      const deviceIpAddressQuery = sql`${getTableColumn("ipAddress")} ILIKE ${partialQuery}`;

      query = sql.join([
        query,
        sql`AND (${deviceNameQuery} OR ${deviceTypeQuery} OR ${deviceStatusQuery} OR ${deviceGroupQuery} OR ${deviceSerialNumberQuery} OR ${deviceIpAddressQuery})`,
      ]);

      return;
    }

    const patterns = value.split(",").map((value) => `%${value}%`);

    const partialQuery = sql.join(
      patterns.map((pattern) => sql`${pattern}`),
      sql`, `,
    );

    query = sql.join([query, sql`AND ${getTableColumn(key)} ILIKE ANY (ARRAY[${partialQuery}])`]);
  });

  return query;
};
