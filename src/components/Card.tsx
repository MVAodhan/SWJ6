import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RecordModel } from "pocketbase";

export default function EpisodeCard({ episode }: { episode: RecordModel }) {
  return (
    <Card className="text-black">
      <CardHeader>
        <CardTitle>{episode.title || "Card Title"}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
