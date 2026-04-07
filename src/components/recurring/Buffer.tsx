import type { IRecurring } from "@/lib/types";
import { Clipboard } from "lucide-react";
import { useRef, useState } from "react";
import { localStringOptions, pb, pstToUTC } from "@/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const Copy = ({ episode }: { episode: IRecurring }) => {
  const socialPost = useRef<HTMLTextAreaElement>(null);

  const [twTweet, setTwTweet] = useState<Boolean>(episode.tw_tweet!);
  const [nmTweet, setNmTweet] = useState<Boolean>(episode.nm_tweet!);
  const [liveTweet, setLiveTweet] = useState<Boolean>(episode.live_tweet!);
  const [twSkeet, setTwSkeet] = useState<boolean>(episode.tw_skeet!);
  const [nmSkeet, setNmSkeet] = useState<Boolean>(episode.nm_skeet!);
  const [liveSkeet, setLiveSkeet] = useState<Boolean>(episode.live_skeet!);

  const utcObj = pstToUTC(episode.date!);

  const updateStatuses = async () => {
    await pb.collection("recurring").update(`${episode.id}`, {
      tw_tweet: twTweet,
      nm_tweet: nmTweet,
      live_tweet: liveTweet,
      tw_skeet: twSkeet,
      nm_skeet: nmSkeet,
      live_skeet: liveSkeet,
    });
  };
  return (
    <div className="w-full h-150 flex backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black p-4">
      {episode.description && (
        <div className="flex flex-col py-2 gap-2">
          <Label>Description</Label>

          <div className="flex items-center">
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

          {episode.youtube_link && (
            <div>
              <Label> Twitter Tweets</Label>
              <div className="grid grid-cols-3 gap-5 py-5 ">
                <div className="flex flex-col justify-center gap-2 ">
                  <Button className="bg-swj-yellow">
                    <Clipboard />
                    Two Weeks
                  </Button>
                  <div className="flex justify-center">
                    {utcObj
                      .subtract({ weeks: 2 })
                      .withTimeZone("America/Los_Angeles")
                      .toLocaleString("en-US", localStringOptions)}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <Button className="bg-swj-yellow">
                    <Clipboard />
                    Ninety Munutes
                  </Button>
                  <div className="flex justify-center">
                    {utcObj
                      .subtract({ minutes: 90 })
                      .withTimeZone("America/Los_Angeles")
                      .toLocaleString("en-US", localStringOptions)}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 ">
                  <Button className="bg-swj-yellow">
                    <Clipboard />
                    Live
                  </Button>
                  <div className="flex justify-center">
                    {utcObj
                      .withTimeZone("America/Los_Angeles")
                      .toLocaleString("en-US", localStringOptions)}
                  </div>
                </div>
                <div className="flex justify-around">
                  <div>Two Weeks</div>
                  <Checkbox
                    onCheckedChange={() => setTwTweet((p) => !p)}
                    defaultChecked={episode.tw_tweet}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Ninety Minutes</div>
                  <Checkbox
                    onCheckedChange={() => setNmTweet((p) => !p)}
                    defaultChecked={episode.nm_tweet}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Live</div>
                  <Checkbox
                    onCheckedChange={() => setLiveTweet((p) => !p)}
                    defaultChecked={episode.live_tweet}
                  />
                </div>
              </div>
              <Label>Bluesky Skeets</Label>
              <div className="grid grid-cols-3 gap-5 py-5">
                <div className="flex flex-col justify-center gap-2 ">
                  <Button className="bg-swj-yellow">
                    <Clipboard />
                    Two Weeks
                  </Button>
                  <div className="flex justify-center">
                    {utcObj
                      .subtract({ weeks: 2 })
                      .withTimeZone("America/Los_Angeles")
                      .toLocaleString("en-US", localStringOptions)}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 ">
                  <Button className="bg-swj-yellow">
                    <Clipboard />
                    Ninety Minute
                  </Button>
                  <div className="flex justify-center">
                    {utcObj
                      .subtract({ minutes: 90 })
                      .withTimeZone("America/Los_Angeles")
                      .toLocaleString("en-US", localStringOptions)}
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2 ">
                  <Button className="bg-swj-yellow">
                    <Clipboard />
                    Live
                  </Button>
                  <div className="flex justify-center">
                    {utcObj
                      .withTimeZone("America/Los_Angeles")
                      .toLocaleString("en-US", localStringOptions)}
                  </div>
                </div>
              </div>
              {/**Bluesky Tweet checkboxes */}
              <div className="grid grid-cols-3 gap-5 py-5">
                <div className="flex justify-around">
                  <div>Two Weeks </div>
                  <Checkbox
                    defaultChecked={episode.tw_skeet}
                    onCheckedChange={() => setTwSkeet((p) => !p)}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Ninety Minutes </div>
                  <Checkbox
                    defaultChecked={episode.nm_skeet}
                    onCheckedChange={() => setNmSkeet((p) => !p)}
                  />
                </div>
                <div className="flex justify-around">
                  <div>Live </div>
                  <Checkbox
                    defaultChecked={episode.live_skeet}
                    onCheckedChange={() => setLiveSkeet((p) => !p)}
                  />
                </div>
                <Button
                  className=" col-span-3 bg-swj-yellow"
                  onClick={updateStatuses}
                >
                  Update Bluesky & Twitter Status
                </Button>
                <div className="size-2.5 "></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Copy;
