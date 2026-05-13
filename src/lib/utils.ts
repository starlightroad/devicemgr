import { twMerge } from "tailwind-merge";

import { clsx, type ClassValue } from "clsx";

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
