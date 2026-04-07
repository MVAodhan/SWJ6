import type { RecordModel } from "pocketbase";

export interface IEpisode extends RecordModel {
  id: string;
  title?: string;
  title_wdp?: string;
  slug?: string;
  slug_wdp?: string;
  date?: string;
  description?: string;
  description_wdp?: string;
  social_post?: string;
  social_post_wdp?: string;
  guests?: IGuest[];
  stream_link?: string;
  links?: ILink[];
  wdp_only?: boolean;
  wdp_link?: string;
  lwj_link?: string;
  technology?: string;
  tw_tweet?: boolean;
  nm_tweet?: boolean;
  live_tweet?: boolean;
  tw_skeet?: boolean;
  nm_skeet?: boolean;
  live_skeet?: boolean;
  discord?: boolean;
  created?: string;
  updated?: string;
}

export interface IRecurring extends RecordModel {
  id: string;
  title?: string;
  slug?: string;
  date?: string;
  description?: string;
  guest_name?: string;
  guest_twitter?: string;
  guest_buffer?: string;
  calendar?: boolean;
  scheduled_tweet?: boolean;
  scheduled_tweet_bs?: boolean;
  ninety_minute_tweet?: boolean;
  ninety_minute_tweet_bs?: boolean;
  live_tweet?: boolean;
  live_tweet_bs?: boolean;
  discord?: boolean;
  youtube_link?: string;
  created?: string;
  updated?: string;
}

export interface ILink {
  id: string;
  label: string;
  value: string;
}

export type IGuest = {
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
