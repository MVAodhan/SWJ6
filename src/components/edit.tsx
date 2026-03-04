import type { IEpisode } from "@/lib/types";
import { PBToPST } from "@/lib/utils";
import { AlignLeft, LinkIcon, Save, Type } from "lucide-react";
import { useRef } from "react";

export function EditComponent({ episode }: { episode: IEpisode }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const socialPostRef = useRef<HTMLTextAreaElement>(null);
  const guestNameRef = useRef<HTMLInputElement>(null);
  const guestTwitterRef = useRef<HTMLInputElement>(null);
  const guestBlueskyRef = useRef<HTMLInputElement>(null);
  const guestLinkedinRef = useRef<HTMLInputElement>(null);
  const utcObject = PBToPST(episode!.date);

  return (
    <div className="relative">
      {/* Decorative background glow */}
      {/* <div className="absolute -inset-1 rounded-2xl blur opacity-20 pointer-events-none"></div> */}

      <div className="relative backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-800  flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black tracking-tight">
              Edit Episode
            </h2>
            <p className="text-sm  mt-1">Edit a podcast episode.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="title"
            >
              <Type size={16} className="" />
              Episode Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="e.g. The Future of Web Development"
              ref={titleRef}
              defaultValue={episode.title}
              className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none "
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2 col-span-full">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="slug"
            >
              <LinkIcon size={16} className="" />
              URL Slug
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="the-future-of-web-development"
              ref={slugRef}
              defaultValue={episode.slug}
              className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
              required
            />
          </div>

          {/* PST Date */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="date"
            >
              PST Date
            </label>
            <div className="font-bold text-xl">
              {utcObject
                .withTimeZone("America/Los_Angeles")
                .toLocaleString("en-US", {
                  calendar: "gregory",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
            </div>
          </div>
          {/* NZST Date */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="slug"
            >
              NZST Date
            </label>
            <div className="font-bold text-xl">
              {utcObject
                .withTimeZone("Pacific/Auckland")
                .toLocaleString("en-US", {
                  calendar: "gregory",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
            </div>
          </div>

          {/* Guest Name */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="guest_name"
            >
              Guest Name
            </label>
            <input
              id="guest_name"
              name="guest_name"
              type="text"
              placeholder="e.g. Jane Doe"
              ref={guestNameRef}
              defaultValue={episode.guest_name}
              className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
            />
          </div>

          {/* Guest Twitter */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="guest_twitter"
            >
              Guest Twitter -{" "}
              <span className="font-light italic">no @ e.g jlengstorf</span>
            </label>
            <div className="relative">
              <input
                id="guest_twitter"
                name="guest_twitter"
                type="text"
                placeholder="username"
                ref={guestTwitterRef}
                defaultValue={episode.guest_twitter}
                className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
              />
            </div>
          </div>

          {/* Guest Bluesky */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="guest_bluesky"
            >
              Guest Bluesky
              <span className="font-light italic">no @ e.g jason.energy</span>
            </label>
            <div className="relative">
              <input
                id="guest_bluesky"
                name="guest_bluesky"
                type="text"
                placeholder="username.bsky.social"
                ref={guestBlueskyRef}
                defaultValue={episode.guest_bluesky}
                className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
              />
            </div>
          </div>

          {/* Guest LinkedIn */}
          <div className="space-y-2">
            <label
              className="text-sm font-medium  flex items-center gap-2"
              htmlFor="guest_linkedin"
            >
              Guest LinkedIn
            </label>
            <input
              id="guest_linkedin"
              name="guest_linkedin"
              type="text"
              placeholder="linkedin.com/in/username"
              ref={guestLinkedinRef}
              defaultValue={episode.guest_linkedIn}
              className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 md:col-span-2 px-4">
          <label
            className="text-sm font-medium  flex items-center gap-2"
            htmlFor="description"
          >
            <AlignLeft size={16} className="text-slate-500" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="What is this episode about?"
            ref={descriptionRef}
            rows={4}
            defaultValue={episode.description}
            className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
            required
          />
        </div>

        {/* Social Post */}
        <div className="space-y-2 md:col-span-2 px-4">
          <label
            className="text-sm font-medium  flex items-center gap-2"
            htmlFor="description"
          >
            <AlignLeft size={16} className="text-slate-500" />
            Social Post
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="What is this episode about?"
            ref={socialPostRef}
            defaultValue={episode.social_post}
            rows={4}
            className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-slate-800 flex justify-end">
          <button
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 bg-[#f0b525] border border-transparent rounded-xl  focus:outline-none focus:ring-0 focus:ring-offset-2 w-full mb-4 mx-4"
            onClick={() => console.log("impliment update fn")}
          >
            <Save
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span>Update Episode</span>
          </button>
        </div>
      </div>
    </div>
  );
}
