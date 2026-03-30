import type { IEpisode } from "@/lib/types";
import { Input } from "./ui/input";
import { Field, FieldDescription, FieldLabel } from "./ui/field";
import { useRef } from "react";
import { Button } from "./ui/button";

const Transcripts = ({ episode }: { episode: IEpisode }) => {
  const transcriptRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full p-4 h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      <Field>
        <FieldLabel htmlFor="transcript">Transcript</FieldLabel>
        <Input id="transcript" type="file" ref={transcriptRef} />
        <FieldDescription>Upload the Transcript as a .txt</FieldDescription>
      </Field>
      <Button
        onClick={async () => {
          const file = transcriptRef.current?.files?.[0];
          if (!file) return;

          const text = await file.text(); // Get the raw string
          localStorage.setItem(`transcript_${episode.id}`, text);
        }}
      >
        Log Transcription Ref
      </Button>
    </div>
  );
};

export default Transcripts;
