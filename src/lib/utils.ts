import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PocketBase from "pocketbase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pb = new PocketBase(
  import.meta.env.VITE_POCKETBASE_URL,
).autoCancellation(false);

export const pickerToPST = (pickerDate: any) => {
  const date = pickerDate.split("-");
  const zonedDateTime = Temporal.ZonedDateTime.from({
    timeZone: "America/Los_Angeles",
    year: Number(date![0]),
    month: Number(date![1]),
    day: Number(date![2]),
    hour: 9,
    minute: 30,
  });
  return zonedDateTime;
};
