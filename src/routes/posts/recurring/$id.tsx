import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/recurring/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    console.log(id);
  },
});

function RouteComponent() {
  return <div>Hello "/posts/recurring/$id"!</div>;
}
