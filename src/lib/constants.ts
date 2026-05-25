import type { HomeItem } from "@/lib/definitions";

export const APP_NAME = "DeviceMGR";

export const APP_DESCRIPTION = "A device management dashboard built with Next.js.";

export const GITHUB_REPO = "https://github.com/starlightroad/devicemgr";

export const TOOLTIP_OFFSET = 12;

export const MAX_ROWS = 10;

export const CHART_CONTAINER_HEIGHT = 256;

export const HOME_PATH = "/";

export const HOME_CONTENT = {
  headline: "Your Devices. Your Way. Grouped and Simplified.",
  subheadline: "The smartest way to group and manage your network assets without the clutter.",
};

export const NOT_FOUND_TITLE = "Resource Not Found";

export const NOT_FOUND_DESCRIPTION = "The resource you are looking for was not found.";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const SECONDS = {
  MINUTE: 60,
  HOUR: 3600,
  DAY: 86400,
  WEEK: 604800,
  MONTH: 2592000,
  YEAR: 31536000,
};

export const homeItems: HomeItem[] = [
  {
    label: "icon-1",
    icon: "computer",
    itemClassName: "flex h-16 w-16 items-center justify-center bg-red-300 lg:h-32 lg:w-32 dark:bg-red-400",
    iconClassName: "size-4 text-red-900 lg:size-6",
  },
  {
    label: "icon-2",
    icon: "phone",
    itemClassName: "flex h-16 w-16 items-center justify-center bg-indigo-300 lg:h-32 lg:w-32 dark:bg-indigo-400",
    iconClassName: "size-4 text-indigo-900 lg:size-6",
  },
  {
    label: "icon-3",
    icon: "printer",
    itemClassName: "flex h-16 w-16 items-center justify-center bg-green-300 lg:h-32 lg:w-32 dark:bg-green-400",
    iconClassName: "size-4 text-green-900 lg:size-6",
  },
  {
    label: "icon-4",
    icon: "database",
    itemClassName: "flex h-16 w-16 items-center justify-center bg-amber-300 lg:h-32 lg:w-32 dark:bg-amber-400",
    iconClassName: "size-4 text-amber-900 lg:size-6",
  },
];
