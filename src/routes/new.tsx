import { createFileRoute, Link } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import {
  ArrowLeft,
  Calendar,
  Type,
  Link as LinkIcon,
  AlignLeft,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";

const loadClientOnly = createClientOnlyFn(() => {
  console.log("client only fn");
  return {
    message: "hello from client loader",
  };
});

export const Route = createFileRoute("/new")({
  component: NewEpisodePage,
});

function NewEpisodePage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    date: "",
    description: "",
    guest_name: "",
    guest_twitter: "",
    guest_bluesky: "",
    guest_linkedin: "",
  });
  useEffect(() => {
    const data = loadClientOnly();
    console.log("data ", data);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title if slug is empty
    if (name === "title" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to PocketBase
    console.log("Form submitted:", formData);
    alert("Episode created! (Demo - not connected to backend)");
  };

  return (
    <div className="min-h-screen  p-4 sm:p-8 font-sans text-black">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-sm font-medium 0 mb-8 transition-colors"
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

          <div className="relative backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-black">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-800  flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-black tracking-tight">
                  New Episode
                </h2>
                <p className="text-sm  mt-1">
                  Publish a new podcast episode to your feed.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none "
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-300 flex items-center gap-2"
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
                    value={formData.slug}
                    onChange={handleChange}
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
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <label
                    className="text-sm font-medium text-slate-300 flex items-center gap-2"
                    htmlFor="description"
                  >
                    <AlignLeft size={16} className="text-slate-500" />
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="What is this episode about?"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                    required
                  />
                </div>

                {/* Guest Name */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-300 flex items-center gap-2"
                    htmlFor="guest_name"
                  >
                    Guest Name
                  </label>
                  <input
                    id="guest_name"
                    name="guest_name"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={formData.guest_name}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                    required
                  />
                </div>

                {/* Guest Twitter */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-300 flex items-center gap-2"
                    htmlFor="guest_twitter"
                  >
                    Guest Twitter
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      @
                    </span>
                    <input
                      id="guest_twitter"
                      name="guest_twitter"
                      type="text"
                      placeholder="username"
                      value={formData.guest_twitter}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* Guest Bluesky */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-300 flex items-center gap-2"
                    htmlFor="guest_bluesky"
                  >
                    Guest Bluesky
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      @
                    </span>
                    <input
                      id="guest_bluesky"
                      name="guest_bluesky"
                      type="text"
                      placeholder="username.bsky.social"
                      value={formData.guest_bluesky}
                      onChange={handleChange}
                      className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                    />
                  </div>
                </div>

                {/* Guest LinkedIn */}
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-300 flex items-center gap-2"
                    htmlFor="guest_linkedin"
                  >
                    Guest LinkedIn
                  </label>
                  <input
                    id="guest_linkedin"
                    name="guest_linkedin"
                    type="text"
                    placeholder="linkedin.com/in/username"
                    value={formData.guest_linkedin}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-black border border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-black transition-all duration-200 bg-slate-300 border border-transparent rounded-xl hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600 focus:ring-offset-slate-900 w-full"
                >
                  <Save
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <span>Add Episode</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
