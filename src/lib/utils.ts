import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import PocketBase from "pocketbase";
import type { IGuest, IEpisode, ILink, IRecurring } from "./types";

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
export const pstToUTC = (PBDate: string) => {
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

export const localStringOptions = {
  weekday: "short",
  calendar: "gregory",
  year: "2-digit",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
};

export const getEpisodes = async () => {
  if (!pb.authStore.record) {
    return null;
  }
  const episodes: IEpisode[] = await pb.collection("episodes").getFullList();
  return episodes;
};
export const getRecurring = async (id: string) => {
  if (!pb.authStore.record) {
    return null;
  }
  const episodes = await pb.collection("recurring").getFullList();
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

export const listGuests = (guests: IGuest[]) => {
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

export const getFirstHandle = (text: string) => {
  const regex = /@([\w.]+)/;

  const regexResults = regex.exec(text);
  if (regexResults) {
    const [handle, handleText] = regexResults;
    return [handle, handleText];
  }

  return null;
};

export const generateTemplateSansPlatform = (
  wdpOnly: boolean,
  technology: string,
  wdplink: string,
  lwjLink?: string,
) => {
  let templateText = "";
  if (!wdpOnly && wdplink && lwjLink) {
    templateText =
      "No worries! Check out our conversation on the Web Dev Podcast, then code along with us on Learn with Jason.";
  }
  if (wdpOnly && wdplink) {
    templateText =
      "No worries! Check out our conversation on the Web Dev Podcast.";
  }

  let episodesTemplate = `
Did you miss @platform_specific_handle teaching us about ${technology}

${templateText}

WDP: ${wdplink}
${lwjLink ? `LWJ: ${lwjLink}` : ""}`;

  return episodesTemplate;
};

export const addHandlesToTemplate = (
  template: string,
  guests: IGuest[],
  platform?: "twitter" | "bluesky",
) => {
  const regexResults = getFirstHandle(template);
  let templateWithHandle = "";
  if (regexResults !== null) {
    switch (platform) {
      case "twitter":
        templateWithHandle = template.replace(
          regexResults[0],
          `@${guests[0].twitter}`,
        );
        break;
      case "bluesky":
        templateWithHandle = template.replace(
          regexResults[0],
          `@${guests[0].bluesky}`,
        );
        break;
      default:
        templateWithHandle = template.replace(regexResults[0], guests[0].name);
    }
  }
  return templateWithHandle;
};

export const twoWeekTweet = (description: string, link: string) => {
  const tweet = `📣 Just Scheduled

${description}

Details: ${link}
`;
  return tweet;
};
export const ninetyMinuteTweet = (description: string, link: string) => {
  const tweet = `⚠️ In 90 Minutes

${description}

Details: ${link}
`;
  return tweet;
};
export const liveTweet = (description: string, link: string) => {
  const tweet = `🔴 Live

${description}

Watch Live: ${link}
`;
  return tweet;
};

export const captionsBlurb = `*Captions provided by White Coat Captioning (https://whitecoatcaptioning.com/). 
Communication Access Realtime Translation (CART) is provided in order to facilitate
communication accessibility and may not be a totally verbatim record of the proceedings.*`;

export const calInvite =
  "lengstorf.com_9plj1m6u9vtddldoinl0hs2vgk@group.calendar.google.com";

export const formatLinks = (JSONLinks: ILink[]) => {
  const linkSet = new Set<ILink>();
  const linkValues = JSONLinks.map((link: ILink) => link);

  for (const value of linkValues) {
    linkSet.add(value);
  }

  let linkSetStrings: string[] = [];
  linkSet.forEach((link) => {
    const linkString = `- ${link!.label}: ${link!.value}`;
    linkSetStrings = [...linkSetStrings, linkString];
  });

  const unique = linkSetStrings.join("\n");
  return unique;
};
