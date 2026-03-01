import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import type { RecordModel } from "pocketbase";

export default function EpisodeCard({ episode }: { episode: RecordModel }) {
  return (
    <Card className="text-black">
      <CardHeader>
        <CardTitle>{episode.title || "Card Title"}</CardTitle>
        <Link to={`/posts/$postId`} params={{ postId: episode.id }}>
          {" "}
          Edit
        </Link>
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
