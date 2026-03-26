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
  wdp_link?: string;
  lwj_link?: string;
  stream_link: string;
  technology: string;
  tw_tweet: boolean;
  nm_tweet: boolean;
  live_tweet: boolean;
  tw_skeet: boolean;
  nm_skeet: boolean;
  live_skeet: boolean;
  discord: boolean;
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

export interface ILink {
  id: string;
  label: string;
  value: string;
}
