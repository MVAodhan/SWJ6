import type { IEpisode } from "@/lib/types";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Clipboard } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";

const Copy = ({ episode }: { episode: IEpisode }) => {
  const socialPost = useRef<HTMLTextAreaElement>(null);

  const [twTweet, setTwTweet] = useState();
  const [nmTweet, setNmTweet] = useState();
  const [lTweet, setLTweet] = useState();
  const [twSkeet, setTwSkeet] = useState();
  const [nmSkeet, setNmSkeet] = useState();
  const [lSkeet, setLSkeet] = useState();
  return (
    <div className="w-full h-150 flex backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black p-4">
      {episode.social_post && (
        <div className="flex flex-col py-2 gap-2">
          <div className="text-xl font-semibold ">Social Post</div>

          <div className="flex items-center">
            <Textarea defaultValue={episode.social_post} ref={socialPost} />
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

          {episode.youtube_link && (
            <div>
              <Label> Twitter Tweets</Label>
              <div className="grid grid-cols-3 gap-5 py-5 ">
                <div className="flex flex-col justify-center gap-2 ">
                  <Button>
                    <Clipboard />
                    Two Weeks
                  </Button>
                  <div className="flex justify-center">TW DateTime</div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <Button>
                    <Clipboard />
                    Ninety Munutes
                  </Button>
                  <div className="flex justify-center">NM DateTime</div>
                </div>
                <div className="flex flex-col justify-center gap-2 ">
                  <Button>
                    <Clipboard />
                    Live
                  </Button>
                  <div className="flex justify-center">Live DateTime</div>
                </div>
                <div className="flex justify-around">
                  <div>Two Weeks</div>
                  <Checkbox />
                </div>
                <div className="flex justify-around">
                  <div>Ninety Minutes</div>
                  <Checkbox />
                </div>
                <div className="flex justify-around">
                  <div>Live</div>
                  <Checkbox />
                </div>
              </div>
              <Label>Bluesky Skeets</Label>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col justify-center gap-2 ">
                  <Button>
                    <Clipboard />
                    Two Weeks
                  </Button>
                  <div className="flex justify-center">TW DateTime</div>
                </div>
                <div className="flex flex-col justify-center gap-2 ">
                  <Button>
                    <Clipboard />
                    Ninety Minute
                  </Button>
                  <div className="flex justify-center">NM DateTime</div>
                </div>
                <div className="flex flex-col justify-center gap-2 ">
                  <Button>
                    <Clipboard />
                    Live
                  </Button>
                  <div className="flex justify-center">Live DateTime</div>
                </div>
              </div>
              {/**Bluesky Tweet checkboxes */}
              <div className="grid grid-cols-3 gap-5 py-5">
                <div className="flex justify-around">
                  <div>Two Weeks </div>
                  <Checkbox />
                </div>
                <div className="flex justify-around">
                  <div>Ninety Minutes </div>
                  <Checkbox />
                </div>
                <div className="flex justify-around">
                  <div>Live </div>
                  <Checkbox />
                </div>
                <Button className="w-full col-span-3">
                  Update Bluesky & Twitter Status
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Copy;
