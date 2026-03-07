import { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Clipboard } from "lucide-react";
import type { IEpisode } from "@/lib/types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PBToPST } from "@/lib/utils";

const Streamyard = ({ episode }: { episode: IEpisode }) => {
  const ytLinkRef = useRef<HTMLInputElement | null>(null);
  const updateYoutubeLink = async () => {
    if (ytLinkRef.current?.value !== null) {
    }
  };

  const utcObj = PBToPST(episode.date);
  return (
    <div className="w-full h-150 flex backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Textarea defaultValue={episode.description} />
          <Clipboard />
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
          className="w-full"
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
