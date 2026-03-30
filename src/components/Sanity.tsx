import type { IEpisode } from "@/lib/types";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { captionsBlurb, listGuests } from "@/lib/utils";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

const Sanity = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className="w-full p-4 h-150 flex  backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      <div className="flex flex-col gap-10 w-1/2 h-full items-center">
        <Label>WDP Copy</Label>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <h2>Title</h2>
            {episode.title_wdp && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.title_wdp) return;
                  window.navigator.clipboard.writeText(episode.title_wdp);
                  toast("Episode Title copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Slug</h2>
            {episode.slug_wdp && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.slug_wdp) return;
                  window.navigator.clipboard.writeText(episode.slug_wdp);
                  toast("Episode Slug copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Description</h2>
            {episode.description_wdp && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.description_wdp) return;
                  window.navigator.clipboard.writeText(episode.description_wdp);
                  toast("Episode Description copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Banner Alt Text</h2>

            {episode.guests && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.guests) return;
                  const altText = `Jason Lenstorf and ${listGuests(episode.guests)}'s headshot on a banner image`;
                  window.navigator.clipboard.writeText(altText);
                  toast("Episode Banner Alt Text copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>YouTube ID</h2>
            {episode.stream_link && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.stream_link) return;
                  const results = episode.stream_link.split("=");

                  window.navigator.clipboard.writeText(results[1]);
                  toast("Episode YouTube ID copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Transcriptions Credit</h2>
            <Clipboard
              className="cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(captionsBlurb);
                toast("Episode Banner Alt Text copied");
              }}
            />
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col gap-10 w-1/2 h-full items-center">
        <Label>LWJ Copy</Label>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <h2>Title</h2>
            {episode.title && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.title) return;
                  window.navigator.clipboard.writeText(episode.title);
                  toast("Episode Title copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Slug</h2>
            {episode.slug && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.slug) return;
                  window.navigator.clipboard.writeText(episode.slug);
                  toast("Episode Slug copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Description</h2>
            {episode.description && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.description) return;
                  window.navigator.clipboard.writeText(episode.description);
                  toast("Episode Description copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Banner Alt Text</h2>
            {episode.guests && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.guests) return;
                  const altText = `Jason Lenstorf and ${listGuests(episode.guests)}'s headshot on a banner image`;
                  window.navigator.clipboard.writeText(altText);
                  toast("Episode Banner Alt Text copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>YouTube ID</h2>
            {episode.stream_link && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
                  if (!episode.stream_link) return;
                  const results = episode.stream_link.split("=");

                  window.navigator.clipboard.writeText(results[1]);
                  toast("Episode YouTube ID copied");
                }}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <h2>Transcriptions Credit</h2>
            <Clipboard
              className="cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(captionsBlurb);
                toast("Episode Banner Alt Text copied");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sanity;
