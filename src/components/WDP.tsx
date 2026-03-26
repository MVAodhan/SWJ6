import type { IEpisode, ILink } from "@/lib/types";
import { Label } from "./ui/label";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { captionsBlurb, listGuests } from "@/lib/utils";

const WDP = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className="w-full p-4 h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <Label>Title</Label>

            <Clipboard
              className="cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(episode.title);
                toast("Episode Title copied");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label>Slug</Label>
            <Clipboard
              className="cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(episode.slug);
                toast("Episode Slug copied");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label>Description</Label>
            <Clipboard
              className="cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(episode.description);
                toast("Episode Description copied");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label>Banner Alt Text</Label>
            <Clipboard
              className="cursor-pointer"
              onClick={() => {
                const altText = `Jason Lenstorf and ${listGuests(episode.guests)}'s headshot on a banner image`;
                window.navigator.clipboard.writeText(altText);
                toast("Episode Banner Alt Text copied");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Label>YouTube ID</Label>
            {episode.stream_link && (
              <Clipboard
                className="cursor-pointer"
                onClick={() => {
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
            <Label>Transcriptions Credit</Label>
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

export default WDP;
