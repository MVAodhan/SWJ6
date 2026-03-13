import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IEpisode } from "@/lib/types";
import { listGuests } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function EpisodeCard({ episode }: { episode: IEpisode }) {
  const guestList = listGuests(episode.guests);

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
      </CardContent>
    </Card>
  );
}
