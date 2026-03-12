import { pb, pickerToPST } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Type,
  Link as LinkIcon,
  AlignLeft,
  Save,
  Plus,
  Minus,
} from "lucide-react";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import GuestInfo, { type Guest } from "@/components/GuestInfo";

export const Route = createFileRoute("/new")({
  component: NewEpisodePage,
});

function NewEpisodePage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const socialPostRef = useRef<HTMLTextAreaElement>(null);

  const [guests, setGuests] = useState<Guest[]>([
    { id: nanoid(), name: "", twitter: "", bluesky: "", linkedin: "" },
  ]);

  const addGuest = () => {
    setGuests([
      ...guests,
      { id: nanoid(), name: "", twitter: "", bluesky: "", linkedin: "" },
    ]);
  };

  const removeGuest = () => {
    if (guests.length > 0) {
      setGuests(guests.slice(0, -1));
    }
  };

  const updateGuest = (index: number, field: keyof Guest, value: string) => {
    const newGuests = [...guests];
    newGuests[index] = { ...newGuests[index], [field]: value };
    setGuests(newGuests);
  };

  const createNewEpisode = async () => {
    const utc = pickerToPST(dateRef.current?.value)
      .withTimeZone("UTC")
      .toString()
      .split("+");

    await pb.collection("episodes").create({
      title: titleRef.current?.value,
      slug: slugRef.current?.value,
      date: utc[0],
      description: descriptionRef.current?.value,
      social_post: socialPostRef.current?.value,
      guests: guests,
    });
  };

  return (
    <div className="min-h-screen  p-4 sm:p-8 font-sans text-black">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-medium  mb-8 transition-colors"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Back to Home</span>
        </Link>

        <div className="relative">
          {/* Decorative background glow */}
          <div className="absolute -inset-1 rounded-2xl blur opacity-20 pointer-events-none"></div>

          <div className="relative backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden text-black">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  New Episode
                </h2>
                <p className="text-sm  mt-1">
                  Publish a new podcast episode to your feed.
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium">
                  Guests: {guests.length}
                </span>
                <div className="flex bg-slate-100 rounded-lg border border-slate-200">
                  <button
                    onClick={removeGuest}
                    type="button"
                    className="px-3 py-1 hover:bg-slate-200 rounded-l-lg transition-colors disabled:opacity-50"
                    disabled={guests.length === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={addGuest}
                    type="button"
                    className="px-3 py-1 hover:bg-slate-200 rounded-r-lg transition-colors border-l border-slate-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
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
                  className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none "
                  required
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
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
                  className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                  required
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label
                  className="text-sm font-medium  flex items-center gap-2"
                  htmlFor="date"
                >
                  <Calendar size={16} className="" />
                  Publish Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  ref={dateRef}
                  className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
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
                  className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                  required
                />
              </div>

              {/* Social Post */}
              <div className="space-y-2 md:col-span-2">
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
                  rows={4}
                  className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                  required
                />
              </div>

              {guests.map((guest, index) => (
                <GuestInfo
                  key={guest.id}
                  guest={guest}
                  index={index}
                  updateGuest={updateGuest}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-800 flex justify-end">
              <button
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 bg-[#f0b525] border border-transparent rounded-xl  focus:outline-none focus:ring-0 focus:ring-offset-2 w-full mb-4 mx-4"
                onClick={() => createNewEpisode()}
                // onClick={() => console.log(guests)}
              >
                <Save
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Add Episode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
