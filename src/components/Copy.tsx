import type { IEpisode } from "@/lib/types";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

const Copy = ({ episode }: { episode: IEpisode }) => {
  const [lwjSeason, setLwjSeason] = useState("s9");
  const [wdpSeason, setWDPSeason] = useState("s1");
  return (
    <div className="w-full p-4 h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 ">
          <div>
            <Label className="pb-2">LWJ Season</Label>
            <Select value={lwjSeason} onValueChange={setLwjSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="s9">s9</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="pb-2">WDP Series</Label>
            <Select value={wdpSeason} onValueChange={setWDPSeason}>
              <SelectTrigger>
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="s1">s1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Textarea defaultValue={episode.social_post} />
      </div>
    </div>
  );
};

export default Copy;
