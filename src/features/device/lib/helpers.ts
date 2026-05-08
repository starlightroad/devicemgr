import { sql } from "drizzle-orm";

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
  if (!sort) return sql`${devicesTable.createdAt} ASC`;

  return sql`${getTableColumn(sort.column)} ${sort.direction === "asc" ? sql`ASC` : sql`DESC`}`;
};

export const getSqlWhereStatementByFilters = (filters: Options["filters"]) => {
  let query = sql``;

  if (!filters) return query;

  Object.entries(filters).forEach((filter) => {
    const [key, value] = filter;

    if (key === "query") {
      return;
    }

    const patterns = value.split(",").map((value) => `%${value}%`);

    const partialQuery = sql.join(
      patterns.map((pattern) => sql`${pattern}`),
      sql`, `,
    );

    query = sql.join([query, sql`AND ${getTableColumn(key)} ILIKE ANY (ARRAY[${partialQuery}])`]);
  });

  if (filters.query) {
    const partialQuery = sql.join([`%${filters.query}%`]);
    query = sql.join([
      query,
      sql`AND (${devicesTable.name} ILIKE ${partialQuery} OR ${deviceTypesTable.name} ILIKE ${partialQuery} OR ${deviceStatusesTable.name} ILIKE ${partialQuery} OR ${deviceGroupsTable.name} ILIKE ${partialQuery})`,
    ]);
  }

  return query;
};
