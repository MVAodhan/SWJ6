import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PocketBase from "pocketbase";
import type { Guest, IEpisode } from "./types";

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
export const PBToPST = (PBDate: string) => {
  const dateTimeZone = PBDate.split(".");

  const date = dateTimeZone[0].split(" ");

  const year = date[0].split("-")[0];
  const month = date[0].split("-")[1];
  const day = date[0].split("-")[2];

  const hour = date[1].split(":")[0];
  const minutes = date[1].split(":")[1];

  const zonedDateTime = Temporal.ZonedDateTime.from({
    timeZone: "UTC",
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minutes),
  });
  return zonedDateTime;
};

export const getEpisodes = async () => {
  if (!pb.authStore.record) {
    return null;
  }
  const episodes: IEpisode[] = await pb.collection("episodes").getFullList();
  return episodes;
};

export const getEpisode = async (id: string) => {
  if (!pb.authStore.record) {
    return null;
  }
  const episode: IEpisode = await pb
    .collection("episodes")
    .getFirstListItem(`id="${id}"`);

  return episode;
};

export async function updateEpisode(episode: IEpisode, options: {}) {
  const res = await pb.collection("episodes").update(episode.id, {
    ...options,
  });

  console.log(res);
}

export const replaceFirstHandle = (text: string) => {
  const result = text.replace(/@([\w.]+)/, text);
  return result;
};

export const listGuests = (guests: Guest[]) => {
  let list = "";
  if (!guests || guests.length === 0) return list;

  switch (guests.length) {
    case 1:
      list = guests[0].name;
      break;
    case 2:
      list = `${guests[0].name} & ${guests[1].name}`;
      break;
    default: {
      const names = guests.map((g) => g.name);
      const last = names.pop();
      list = `${names.join(", ")}, & ${last}`;
      break;
    }
  }

  return list;
};
