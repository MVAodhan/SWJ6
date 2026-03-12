import type { Guest } from "@/lib/types";
import { Label } from "./ui/label";

const GuestEditInfo = ({ guest }: { guest: Guest }) => {
  return (
    <div className="space-y-2">
      <div>
        <Label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor="guest_name"
        >
          Guest
        </Label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          placeholder="e.g. Jane Doe"
          defaultValue={guest.name}
          className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
        />
      </div>
      <div>
        <Label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor="guest_name"
        >
          Twitter
        </Label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          placeholder="e.g. Jane Doe"
          defaultValue={guest.twitter}
          className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
        />
      </div>
      <div>
        <Label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor="guest_name"
        >
          BlueSky
        </Label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          placeholder="e.g. Jane Doe"
          defaultValue={guest.bluesky}
          className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
        />
      </div>
      <div>
        <Label
          className="text-sm font-medium  flex items-center gap-2"
          htmlFor="guest_name"
        >
          LinkedIn
        </Label>
        <input
          id="guest_name"
          name="guest_name"
          type="text"
          placeholder="e.g. Jane Doe"
          defaultValue={guest.linkedin}
          className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default GuestEditInfo;
