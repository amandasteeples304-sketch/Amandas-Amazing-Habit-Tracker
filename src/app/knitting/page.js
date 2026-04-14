import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import ProjectFilter from "@/components/ProjectFilter";

export default async function KnittingPage({ searchParams }) {
  const params = await searchParams;
  const status = params.status;

  let query = supabase
    .schema("habit_tracker")
    .from("knitting_details")
    .select("*");

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: projects, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error)
    return (
      <div className="p-20 text-center">
        Error loading projects: {error.message}
      </div>
    );

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <NavBar />
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-(--habit-text)">My knits</h1>
          <p className="opacity-60 mt-2">Tracking Every Stitch and Row</p>
        </div>
        <ProjectFilter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.length > 0 ? (
          projects.map((project) => (
            <Link
              key={project.id}
              href={`/knitting/${project.slug}`}
              className="group flex flex-col bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/8 transition-all hover:-translate-y-1 shadow-xl"
            >
              <div
                className="w-full relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.project_name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20 italic">
                    No Project Image
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {project.project_name}
                </h3>
                <p className="text-sm opacity-50 mt-2 line-clamp-2 leading-relaxed">
                  {project.status_notes ||
                    project.task_description ||
                    "No Notes Yet."}
                </p>
                <div className="mt-6 flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Project Details →
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="opacity-40 italic">
              {" "}
              No {status || " "} projects found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
