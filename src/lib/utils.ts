import { twMerge } from "tailwind-merge";

import { clsx, type ClassValue } from "clsx";

import { SECONDS } from "@/lib/constants";

import type { TimeInterval } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = () => crypto.randomUUID().replaceAll("-", "");

export const camelCase = (value: string) => {
  return value
    .split(" ")
    .map((word, idx) => (Boolean(idx) ? `${word[0].toUpperCase()}${word.slice(1)}` : word))
    .join("");
};

export const isMatch = (value1: string, value2: string) => value1.trim().toLowerCase() === value2.trim().toLowerCase();

export const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const past = new Date(date);

  const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: TimeInterval[] = [
    { label: "year", seconds: SECONDS.YEAR },
    { label: "month", seconds: SECONDS.MONTH },
    { label: "week", seconds: SECONDS.WEEK },
    { label: "day", seconds: SECONDS.DAY },
    { label: "hour", seconds: SECONDS.HOUR },
    { label: "minute", seconds: SECONDS.MINUTE },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

  for (const interval of intervals) {
    if (secondsAgo >= interval.seconds) {
      const count = Math.floor(secondsAgo / interval.seconds);

      return rtf.format(-count, interval.label);
    }
  }

  return "Just now";
};
