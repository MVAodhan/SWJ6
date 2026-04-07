import Cal from "@/components/recurring/Cal";
import Edit from "@/components/recurring/Edit";
import Streamyard from "@/components/recurring/Streamyard";
import Buffer from "@/components/recurring/Buffer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRecurring } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import Discord from "@/components/recurring/Discord";

export const Route = createFileRoute("/posts/recurring/$id")({
  component: RouteComponent,
  loader: async ({ params: { id } }) => {
    const recurring = await getRecurring(id);

    return recurring![0];
  },
});

function RouteComponent() {
  const recurring = Route.useLoaderData();

  return (
    <div className="min-h-screen  p-4 sm:p-8 font-sans text-black">
      <div className="max-w-6xl  mx-auto">
        <Tabs defaultValue="edit" className="w-full h-full">
          <TabsList className="w-full">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="streamyard">Streamyard</TabsTrigger>
            <TabsTrigger value="cal">Cal</TabsTrigger>
            <TabsTrigger value="buffer">Buffer</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Edit episode={recurring} />
          </TabsContent>
          <TabsContent value="streamyard">
            <Streamyard episode={recurring} />
          </TabsContent>
          <TabsContent value="cal">
            <Cal episode={recurring} />
          </TabsContent>
          <TabsContent value="buffer">
            <Buffer episode={recurring} />
          </TabsContent>
          <TabsContent value="discord">
            <Discord episode={recurring} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
