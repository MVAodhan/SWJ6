import { getEpisode } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditComponent } from "@/components/edit";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params: { postId } }) => getEpisode(postId),
  component: PostComponent,
});

function PostComponent() {
  const episode = Route.useLoaderData();

  return (
    <div className="min-h-screen  p-4 sm:p-8 font-sans text-black">
      <div className="max-w-3xl mx-auto">
        {episode && (
          <Tabs defaultValue="edit" className="w-full">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <EditComponent episode={episode} />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
