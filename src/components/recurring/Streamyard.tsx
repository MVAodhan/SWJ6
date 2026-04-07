import { useRef } from "react";
import { Clipboard } from "lucide-react";
import type { IRecurring } from "@/lib/types";

import { pb, pstToUTC } from "@/lib/utils";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Streamyard = ({ episode }: { episode: IRecurring }) => {
  const ytLinkRef = useRef<HTMLInputElement | null>(null);
  const updateYoutubeLink = async () => {
    if (ytLinkRef.current?.value !== null) {
      await pb.collection("recurring").update(`${episode.id}`, {
        stream_link: ytLinkRef.current!.value,
      });

      toast("Youtube link updated");
    }
  };

  const socialPost = useRef<HTMLTextAreaElement>(null);

  const utcObj = pstToUTC(episode!.date!);
  return (
    <div className="w-full h-150 flex backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <div className="flex gap-3">
            <div>{episode.title}</div>
            <Clipboard
              className="size-4 cursor-pointer"
              onClick={() => {
                window.navigator.clipboard.writeText(episode!.title!);
                toast("Title copied");
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-5 ">
          <Label>Description</Label>

          <div className="flex  items-center">
            <Textarea defaultValue={episode.description} ref={socialPost} />
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  socialPost.current?.value as string,
                )
              }
            >
              <Clipboard />
            </Button>
          </div>
        </div>
        <div className="flex w-full gap-2  py-5 justify-around">
          <div>
            <div className="italic font-light flex items-center gap-2">
              NZ Date
            </div>
            <div className="font-bold text-xl">
              {utcObj.withTimeZone("Pacific/Auckland").toLocaleString("en-US", {
                calendar: "gregory",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div>
            <div className="italic font-light flex items-center gap-2">
              US Date
            </div>
            <div className="font-bold text-xl">
              {utcObj
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
        </div>
        <div className="w-full">
          <div>Youtube Link</div>
          <Input defaultValue={episode.youtube_link} ref={ytLinkRef} />
        </div>
        <Button
          className="w-full bg-swj-yellow"
          onClick={() => {
            updateYoutubeLink();
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default Streamyard;
