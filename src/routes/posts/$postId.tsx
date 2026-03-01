import { createFileRoute } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";

export const Route = createFileRoute("/posts/$postId")({
  ssr: false,
  loader: ({ params: { postId } }) => getEpisode(postId),
  component: PostComponent,
});

const getEpisode = createClientOnlyFn((id) => {
  return id;
});
function PostComponent() {
  const id = Route.useLoaderData();
  return <div>{id}</div>;
}
