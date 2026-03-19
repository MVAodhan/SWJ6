import type { RecordModel } from "pocketbase";

export interface IEpisode extends RecordModel {
  date: string;
  description: string;
  guests: Guest[];
  id: string;
  slug: string;
  social_post: string;
  title: string;
  links: [];
  wdp_only: boolean;
  wdp_link: string;
  lwj_link: string;
  technology: string;
}

export interface ILink {
  id: string;
  label: string;
  value: string;
}

export type Guest = {
  id: string;
  name: string;
  twitter: string;
  bluesky: string;
  linkedin: string;
};
