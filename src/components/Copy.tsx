import type { IEpisode } from "@/lib/types";
import { Label } from "./ui/label";

import { useState } from "react";

import { Input } from "./ui/input";

import { Button } from "./ui/button";
import {
  addHandlesToTemplate,
  generateTemplateSansPlatform,
  pb,
} from "@/lib/utils";
import { toast } from "sonner";

const Copy = ({ episode }: { episode: IEpisode }) => {
  const [wdpLink, setWdpink] = useState("");
  const [lwjLink, setLwjLink] = useState("");
  const [techText, setTechText] = useState("");

  const saveEpisodeLinks = async () => {
    await pb.collection("episodes").update(`${episode.id}`, {
      wdp_link: wdpLink,
      lwj_link: lwjLink,
      technology: techText,
    });
  };
  return (
    <div className="w-full p-4 h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      <div className="flex flex-col gap-4">
        {!episode.wdp_only && (
          <div className="flex flex-col gap-2">
            <Label>LWJ Link</Label>
            <Input
              onChange={(e) => {
                setLwjLink(e.target.value);
              }}
            />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Label>WDP Link</Label>
          <Input
            onChange={(e) => {
              setWdpink(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Text to replace technology</Label>
          <div className="font-light italic text-md">
            Did you miss @platform_specific_handle teaching us about{" "}
            <span>technology</span>
          </div>
          <Input
            placeholder="technology"
            onChange={(e) => {
              setTechText(e.target.value);
            }}
          />
        </div>
        <div className="w-full">
          <Button className="w-full" onClick={saveEpisodeLinks}>
            Save links
          </Button>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col">
            <Label>Twitter</Label>
            <Button
              onClick={() => {
                let generated = generateTemplateSansPlatform(techText, wdpLink);
                generated = addHandlesToTemplate(generated, episode.guests);
                window.navigator.clipboard.writeText(generated);
                toast("Live Episode copied");
              }}
            >
              Copy Live Episode{" "}
            </Button>
          </div>
          <Button
            onClick={() => {
              let generated = generateTemplateSansPlatform(techText, wdpLink);
              generated = addHandlesToTemplate(
                generated,
                episode.guests,
                "bluesky",
              );

              window.navigator.clipboard.writeText(generated);
              toast("Live Episode copied");
            }}
          >
            Copy Live Episode{" "}
          </Button>
        </div>

        {episode.wdp_only === true && techText && wdpLink && (
          <Button
            onClick={() => {
              const generated = generateTemplateSansPlatform(techText, wdpLink);
              window.navigator.clipboard.writeText(generated);
              toast("Live Episode copied");
            }}
          >
            Copy Live Episode{" "}
          </Button>
        )}

        {!episode.wdp_only && techText && wdpLink && lwjLink && (
          <Button
            onClick={() => {
              const generated = generateTemplateSansPlatform(
                techText,
                wdpLink,
                lwjLink,
              );
              window.navigator.clipboard.writeText(generated);
              toast("Live Episode copied");
            }}
          >
            Shows Twitter{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Copy;
