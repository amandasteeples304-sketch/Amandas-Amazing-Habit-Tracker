import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/utils/supabase/client";
import NavBar from "@/components/NavBar";

export default async function NewWalkPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/walking");
  }

  async function createWalk(formData) {
    "use server";

    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorised");

    const route_name = formData.get("route_name");
    const distance_miles = parseFloat(formData.get("distance_miles"));
    const status_notes = formData.get("status_notes");
    const image_url = formData.get("image_url");

    const slug = route_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const { error } = await supabase
      .schema("habit_tracker")
      .from("walking_details")
      .insert({
        route_name,
        distance_miles,
        status_notes,
        slug,
        image_url: image_url || null,
        status: "active",
      });
    if (error) {
      console.error("Error creating walk:", error);
      return;
    }
    redirect("/walking");
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <NavBar />
      <div className="mt-8 mb-12">
        <h1 className="text-4xl font-bold text-(--habit-text)">
          Log a New Walk
        </h1>
        <p className="opacity-60 mt-2">Add a new route to your tracker</p>
      </div>
      <form
        action={createWalk}
        className="space-y-6 bg-white/5 p-8 rounded-3xl border border-(--habit-border) shadow-xl"
      >
        <div>
          <label className="block text-sm font-semibold opacity-80 mb-2">
            Route Name
          </label>
          <input
            type="text"
            name="route_name"
            required
            placeholder="e.g. Morning Stroll"
            className="w-full bg-white/5 border border-(--habit-border) rounded-xl px-4 py-3 text-white focus:border-(--habit-hover) focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold opacity-80 mb-2">
            Distance (Miles)
          </label>
          <input
            type="number"
            step="0.01"
            name="distance_miles"
            required
            placeholder="e.g. 3.5"
            className="w-full bg-white/5 border border-(--habit-border) rounded-xl px-4 py-3 text-white focus:border-(--habit-hover) focus:outline-none transition all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold opacity-80 mb-2">
            Route Image URL
          </label>
          <input
            type="url"
            name="image_url"
            placeholder="eg. https://res.cloudinary.com/..."
            className="w-full bg-white/5 border border-(--habit-border) rounded-xl px-4 py-3 text-white focus:border-(--habit-hover) focus:outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold opacity-80 mb-2">
            Notes
          </label>
          <textarea
            name="status_notes"
            placeholder="How was the route?"
            className="w-full bg-white/5 border border-(--habit-border) rounded-xl px-4 py-3 text-white focus:border-(--habit-hover) focus:outline-none transition-all h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-(--habit-bg) hover:bg-(--habit-hover) text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-(--habit-bg)/20"
        >
          Save Route
        </button>
      </form>
    </main>
  );
}
