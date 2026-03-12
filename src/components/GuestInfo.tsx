import type { Guest } from "@/lib/types";

interface GuestInfoProps {
  index: number;
  guest: Guest;
  updateGuest: (index: number, field: keyof Guest, value: string) => void;
}

const GuestInfo = ({ index, guest, updateGuest }: GuestInfoProps) => {
  return (
    <div className="grid grid-cols-2 col-span-2 w-full gap-2 border-t border-slate-800 pt-6 mt-2">
      <h3 className="col-span-2 text-lg font-semibold mb-2">
        Guest {index + 1}
      </h3>
      <div className="space-y-2">
        <label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor={`guest_name_${index}`}
        >
          Guest Name
        </label>
        <input
          id={`guest_name_${index}`}
          name={`guest_name_${index}`}
          type="text"
          value={guest.name}
          onChange={(e) => updateGuest(index, "name", e.target.value)}
          placeholder="e.g. Jane Doe"
          className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor={`guest_twitter_${index}`}
        >
          Guest Twitter -{" "}
          <span className="font-light italic">no @ e.g jlengstorf</span>
        </label>
        <div className="relative">
          <input
            id={`guest_twitter_${index}`}
            name={`guest_twitter_${index}`}
            type="text"
            value={guest.twitter}
            onChange={(e) => updateGuest(index, "twitter", e.target.value)}
            placeholder="username"
            className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor={`guest_bluesky_${index}`}
        >
          Guest Bluesky -{" "}
          <span className="font-light italic">no @ e.g jason.energy</span>
        </label>
        <div className="relative">
          <input
            id={`guest_bluesky_${index}`}
            name={`guest_bluesky_${index}`}
            type="text"
            value={guest.bluesky}
            onChange={(e) => updateGuest(index, "bluesky", e.target.value)}
            placeholder="username.bsky.social"
            className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor={`guest_linkedin_${index}`}
        >
          Guest LinkedIn
        </label>
        <input
          id={`guest_linkedin_${index}`}
          name={`guest_linkedin_${index}`}
          type="text"
          value={guest.linkedin}
          onChange={(e) => updateGuest(index, "linkedin", e.target.value)}
          placeholder="linkedin.com/in/username"
          className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default GuestInfo;
