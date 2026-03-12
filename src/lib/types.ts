import type { RecordModel } from "pocketbase";

export interface IEpisode extends RecordModel {
  date: string;
  description: string;
  guest_bluesky: string;
  guest_linkedIn: string;
  guest_name: string;
  guest_twitter: string;
  id: string;
  slug: string;
  social_post: string;
  title: string;
  links: [];
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
