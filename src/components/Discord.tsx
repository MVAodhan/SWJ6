import { Clipboard } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import type { IEpisode } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { pb, PBToUTC } from "@/lib/utils";
import { useState } from "react";

const Discord = ({ episode }: { episode: IEpisode }) => {
  const utcObject = PBToUTC(episode.date);

  const [discordChecked, setDiscordChecked] = useState<boolean>(
    episode.discord,
  );

  const updateDiscordStatus = async () => {
    await pb.collection("episodes").update(`${episode.id}`, {
      discord: discordChecked,
    });
  };

  return (
    <div className="w-full h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black p-4">
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center ">
          <div className="">{`${episode.title}`}</div>
          <Button variant="ghost">
            <Clipboard
              onClick={() => {
                navigator.clipboard.writeText(episode.title);
              }}
            />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {episode.youtube_link && (
            <div>
              <div className="">Location</div>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(episode.youtube_link);
                }}
              >
                <Clipboard />
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-2 ">
          <Label htmlFor="date" className="text-md ">
            Date (NZST)
          </Label>
          <div>
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
          {/* <DatePicker date={date!} setDate={setDate} /> */}
        </div>

        <div className="space-y-2">
          <Textarea value={episode.description} className="w-full" readOnly />
        </div>
        <div>
          <div>Scheduled</div>
          <Checkbox
            defaultChecked={discordChecked}
            onCheckedChange={() => setDiscordChecked((prev) => !prev)}
          />
        </div>
        <Button className="bg-swj-yellow" onClick={updateDiscordStatus}>
          Update Discord Status
        </Button>
      </div>
    </div>
  );
};

export default Discord;
