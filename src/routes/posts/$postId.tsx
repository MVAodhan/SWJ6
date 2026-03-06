import { getEpisode } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditComponent } from "@/components/edit";
import { Links } from "@/components/Links";
import Copy from "@/components/Buffer";
export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params: { postId } }) => getEpisode(postId),
  component: PostComponent,
});

function PostComponent() {
  const episode = Route.useLoaderData();

  return (
    <div className="min-h-screen  p-4 sm:p-8 font-sans text-black">
      <div className="max-w-3xl  mx-auto">
        {episode && (
          <Tabs defaultValue="edit" className="w-full h-full">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="buffer">Buffer</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <EditComponent episode={episode} />
            </TabsContent>
            <TabsContent value="links">
              <div className="w-full h-150 flex backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
                <Links episode={episode} />
              </div>
            </TabsContent>
            <TabsContent value="buffer">
              <Copy episode={episode} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
