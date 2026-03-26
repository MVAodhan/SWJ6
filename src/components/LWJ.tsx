import type { IEpisode } from "@/lib/types";

const LWJ = ({ episode }: { episode: IEpisode }) => {
  return (
    <div className="w-full p-4 h-150 flex flex-col backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
      LWJ Component
    </div>
  );
};

export default LWJ;
