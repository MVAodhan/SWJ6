import { Clipboard } from "lucide-react";
import { Label } from "./ui/label";
import type { IEpisode } from "@/lib/types";
import { toast } from "sonner";
import { calInvite, PBToUTC } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRef } from "react";

const Cal = ({ episode }: { episode: IEpisode }) => {
  const utcObject = PBToUTC(episode!.date);
  const descRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="w-full h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black p-4">
      <div className="flex flex-col gap-2">
        <Label className="text-xl font-bold text-black">Title</Label>
        <div className="flex gap-3">
          <div>{`LWJ: ${episode.title}`}</div>
          <Clipboard
            className="size-4 cursor-pointer"
            onClick={() => {
              window.navigator.clipboard.writeText(`LWJ: ${episode.title}`);

              toast("Title copied");
            }}
          />
        </div>
      </div>

      <div className="flex gap-10">
        <div className="space-y-2 py-4">
          <Label className="italic font-light flex items-center gap-2">
            Invite
          </Label>
          <Clipboard
            className="cursor-pointer"
            onClick={() => {
              window.navigator.clipboard.writeText(calInvite);
              toast("Copied Invite");
            }}
          />
        </div>
        <div className="space-y-2 py-4">
          <Label className="italic font-light flex items-center gap-2">
            Location
          </Label>
          <Clipboard
            className="cursor-pointer"
            onClick={() => {
              window.navigator.clipboard.writeText(episode.stream_link);
              toast("Copied Invite");
            }}
          />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="space-y-2 py-4">
          <Label
            className="italic font-light flex items-center gap-2"
            htmlFor="date"
          >
            PST Date
          </Label>
          <div className="font-bold text-xl">
            {utcObject
              .withTimeZone("America/Los_Angeles")
              .toLocaleString("en-US", {
                calendar: "gregory",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
          </div>
        </div>
        <div className="space-y-2 py-4">
          <Label
            className="italic font-light flex items-center gap-2"
            htmlFor="date"
          >
            PST Date
          </Label>
          <div className="font-bold text-xl">
            {utcObject
              .withTimeZone("Pacific/Auckland")
              .toLocaleString("en-US", {
                calendar: "gregory",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
          </div>
        </div>
      </div>

      <div className="flex flex-col py-2 gap-2">
        <Label>Description</Label>

        <div className="flex items-center">
          <Textarea defaultValue={episode.description} ref={descRef} />
          <Button
            variant="ghost"
            onClick={() =>
              navigator.clipboard.writeText(descRef.current?.value as string)
            }
          >
            <Clipboard />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cal;
