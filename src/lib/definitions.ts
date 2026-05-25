import type { SortDirection } from "@/features/device/lib/definitions";

export type ActionResult<T> = { data: T; error: null } | { data: null; error: string };

export type ActionReturnType<T extends object> = Promise<{ success: boolean; serverErrors: T | null }>;

export type Options = {
  pagination?: {
    limit: number;
    offset?: number;
  };
  sort?: {
    column: string;
    direction: SortDirection;
  };
  filters?: Record<string, string>;
};

export type TimeInterval = {
  label: Intl.RelativeTimeFormatUnit;
  seconds: number;
};

export type HomeItemLabel = "computer" | "phone" | "printer" | "database";

export type HomeItem = {
  label: string;
  icon: HomeItemLabel;
  itemClassName: string;
  iconClassName: string;
};
