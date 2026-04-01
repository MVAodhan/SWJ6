import EpisodeCard from "@/components/Card";
import { EpisodeCard as RecurringCard } from "@/components/recurring/Card";

import { getEpisodes, getRecurring } from "@/lib/utils";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  loader: async () => {
    const episodes = await getEpisodes();
    const recurring = await getRecurring();

    return { episodes, recurring };
  },
  component: App,
});

function App() {
  const episodes = Route.useLoaderData();

  console.log(episodes.recurring?.length);

  return (
    <div className="min-h-screen ">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <h1 className="text-6xl md:text-7xl font-black  tracking-[-0.08em]">
              <span className="text-swj-yellow">SCHEDULE WITH JASON</span>{" "}
            </h1>
          </div>
        </div>
      </section>
      <section className="flex w-screen justify-center">
        <div className="flex w-11/12 flex-col gap-16">
          {episodes.episodes &&
          episodes.episodes?.length >= 1 &&
          episodes.recurring &&
          episodes.recurring?.length >= 1 ? (
            <>
              <div className="flex mx-4 justify-center w-full">
                {episodes &&
                  episodes.recurring?.map((episode) => (
                    <RecurringCard key={episode.id} episode={episode} />
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mx-4 gap-2 w-full">
                {episodes &&
                  episodes.episodes.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                  ))}
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center"> No Episodes</div>
          )}
        </div>
      </section>
    </div>
  );
}
