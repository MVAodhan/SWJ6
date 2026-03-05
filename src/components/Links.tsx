import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Save, X, Clipboard } from "lucide-react";
import type { IEpisode, ILink } from "@/lib/types";
import { nanoid } from "nanoid";
import { Label } from "./ui/label";
import { updateEpisode } from "@/lib/utils";
import { toast } from "sonner";

export const Links = ({ episode }: { episode: IEpisode }) => {
  const labelRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);
  const [links, setLinks] = useState<ILink[]>(
    episode.links ? episode.links : [],
  );

  const addLink = () => {
    setLinks([
      ...links,
      {
        id: nanoid(),
        label: labelRef.current?.value!,
        value: valueRef.current?.value!,
      },
    ]);
    labelRef.current!.value = "";
    valueRef.current!.value = "";
  };

  const deleteLink = (id: string) => {
    const newLinks = links.filter((link) => {
      if (link.id != id) return link;
    });
    setLinks([...newLinks]);
  };

  const updateLinks = () => {
    updateEpisode(episode, { links: JSON.stringify(links) });
    // console.log(links);
  };

  return (
    <>
      <ScrollArea className="h-full w-1/2 rounded-md border p-4">
        {links &&
          links.map((link) => (
            <div key={link.id} className="flex flex-col gap-2 py-2">
              <div className="flex justify-between">
                <Label className="flex">{link.label}</Label>
                <Button
                  className="p-0"
                  onClick={() => {
                    navigator.clipboard.writeText(link.label);
                    toast("Copied Label Text", {
                      position: "top-center",
                    });
                  }}
                >
                  <Clipboard className="size-3" />
                </Button>
              </div>
              <div className="flex">
                <Input defaultValue={link.value} className="flex-1" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteLink(link.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
      </ScrollArea>
      <div className="w-1/2">
        <div>
          <div className="flex flex-col gap-2 py-4 px-2">
            <Input placeholder="label" ref={labelRef} />
            <Input placeholder="value" ref={valueRef} />
          </div>
          <div className="flex flex-col gap-y-96 py-4 px-2">
            <Button className="w-full" variant="outline" onClick={addLink}>
              <Plus className="h-4 w-4 mr-2" />
              Add Link
            </Button>
            <Button onClick={updateLinks}>
              <Save className="h-4 w-4 mr-2" />
              Save Links
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
