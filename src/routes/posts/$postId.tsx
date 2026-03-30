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
import WDP from "@/components/Sanity";
import Transcripts from "@/components/Transcripts";
import EditorTab from "@/components/Editor";
export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params: { postId } }) => getEpisode(postId),
  component: PostComponent,
});

function PostComponent() {
  const episode = Route.useLoaderData();

  return (
    <div className="min-h-screen  p-4 sm:p-8 font-sans text-black">
      <div className="max-w-6xl  mx-auto">
        {episode && (
          <Tabs defaultValue="edit" className="w-full h-full">
            <TabsList className="w-full">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="streamyard">Streamyard</TabsTrigger>
              <TabsTrigger value="cal">Cal</TabsTrigger>
              <TabsTrigger value="buffer">Buffer</TabsTrigger>
              <TabsTrigger value="discord">Discord</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="sanity"> Sanity</TabsTrigger>
              <TabsTrigger value="published">Published Episodes</TabsTrigger>
              <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
              <TabsTrigger value="editor">Editor</TabsTrigger>
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
            <TabsContent value="sanity">
              <WDP episode={episode} />
            </TabsContent>
            <TabsContent value="published">
              <Copy episode={episode} />
            </TabsContent>
            <TabsContent value="transcripts">
              <Transcripts episode={episode} />
            </TabsContent>
            <TabsContent value="editor">
              <EditorTab episode={episode} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
