import EpisodeCard from "@/components/Card";

import { getEpisodes } from "@/lib/utils";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: () => getEpisodes(),
  component: App,
});

function App() {
  const episodes = Route.useLoaderData();

  return (
    <div className="min-h-screen ">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <h1 className="text-6xl md:text-7xl font-black  tracking-[-0.08em]">
              <span className="text-[#f0b525]">SCHEDULE WITH JASON</span>{" "}
            </h1>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 mx-4 gap-2">
          {episodes &&
            episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
        </div>
      </section>
    </div>
  );
}
