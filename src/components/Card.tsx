import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IEpisode } from "@/lib/types";
import { listGuests, PBToUTC } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Label } from "./ui/label";

export default function EpisodeCard({ episode }: { episode: IEpisode }) {
  const guestList = listGuests(episode.guests);

  const utcObject = PBToUTC(episode.date);

  return (
    <Card className="text-black">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{episode.title || "Card Title"}</CardTitle>
        <Link to={`/posts/$postId`} params={{ postId: episode.id }}>
          {" "}
          Edit
        </Link>
      </CardHeader>
      <CardContent>
        <div>
          {episode.guests.length > 1 ? "Guests:" : "Guest:"} {guestList}
        </div>
        <div className="flex gap-10 lg:gap-20 py-5">
          {/* PST Date */}
          <div className="space-y-2">
            <Label
              className="italic font-light flex items-center gap-2"
              htmlFor="date"
            >
              PST Date
            </Label>
            <div className="font-bold text-lg">
              {utcObject
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
          {/* NZST Date */}
          <div className="space-y-2">
            <Label
              className="italic font-light flex items-center gap-2"
              htmlFor="slug"
            >
              NZST Date
            </Label>
            <div className="font-bold text-lg">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
