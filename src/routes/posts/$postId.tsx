import { getEpisode } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Links } from "@/components/Links";
import Buffer from "@/components/Buffer";
import Streamyard from "@/components/Streamyard";
import Copy from "@/components/Copy";
import Cal from "@/components/Cal";
import Discord from "@/components/Discord";
import Edit from "@/components/Edit";
import WDP from "@/components/WDP";
import LWJ from "@/components/LWJ";
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
              <TabsTrigger value="streamyard">Streamyard</TabsTrigger>
              <TabsTrigger value="cal">Cal</TabsTrigger>
              <TabsTrigger value="buffer">Buffer</TabsTrigger>
              <TabsTrigger value="discord">Discord</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger> 
              <TabsTrigger value="wdp">WDP Sanity</TabsTrigger> 
              <TabsTrigger value="lwj">LWJ Sanity</TabsTrigger> 
              <TabsTrigger value="published">Published Episodes</TabsTrigger> 
            </TabsList>
            <TabsContent value="edit">
              <Edit episode={episode} />
            </TabsContent>
            <TabsContent value="streamyard">
              <Streamyard episode={episode} />
            </TabsContent>
            <TabsContent value="cal">
              <Cal episode={episode} />
            </TabsContent>
            <TabsContent value="buffer">
              <Buffer episode={episode} />
            </TabsContent>
            <TabsContent value="discord">
              <Discord episode={episode} />
            </TabsContent>
            <TabsContent value="links">
              <Links episode={episode} />
            </TabsContent>
            <TabsContent value="wdp">
              <WDP episode={episode} />
            </TabsContent>
            <TabsContent value="lwj">
              <LWJ episode={episode} />
            </TabsContent>
            <TabsContent value="published">
              <Copy episode={episode} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
