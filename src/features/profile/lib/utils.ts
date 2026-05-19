import { MONTHS } from "@/lib/constants";

const getDateOptions = (): Intl.DateTimeFormatOptions => ({
  month: "long",
  day: "numeric",
  year: "numeric",
});

const getTimeOptions = (): Intl.DateTimeFormatOptions => ({
  hour: "numeric",
  minute: "numeric",
});

export const getSessionDateAndTime = (date: Date) => {
  const dateString = date.toLocaleDateString(undefined, getDateOptions());
  const timeString = date.toLocaleTimeString(undefined, getTimeOptions());

  return `${dateString} ${timeString}`;
};

export const getAnniversaryDate = (date: Date) => `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
