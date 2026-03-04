import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, Save } from "lucide-react";

export const Links = () => {
  const labelRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <ScrollArea className="h-full w-1/2 rounded-md border p-4">
        Your scrollable content here.
      </ScrollArea>
      <div className="w-1/2">
        <div className="flex flex-col gap-2 py-4 px-2">
          <Input placeholder="label" ref={labelRef} />
          <Input placeholder="value" ref={valueRef} />
        </div>
        <div className="flex flex-col gap-2 py-4 px-2">
          <Button className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Links
          </Button>
        </div>
      </div>
    </>
  );
};
