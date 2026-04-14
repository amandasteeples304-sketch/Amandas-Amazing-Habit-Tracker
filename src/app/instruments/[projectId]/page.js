import Stopwatch from "@/components/StopWatch";
import Timer from "@/components/Timer";
import NavBar from "@/components/NavBar";
import * as Tabs from "@radix-ui/react-tabs";
import { Table, Timer as TimerIcon, CirclePlay } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

export default async function ProjectPage({ params }) {
  const { projectId } = await params;

  const { data: project } = await supabase
    .schema("habit_tracker")
    .from("instrument_details")
    .select("*, habits(*)")
    .eq("slug", projectId)
    .single();

  if (!project) return <div>Project not found</div>;

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <NavBar />
      <h1 className="text-3xl font-bold capitalize my-8 text-(--habit-text)">
        {project.instrument_name || projectId.replace("-", " ")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <section className="space-y-6">
          <div className="aspect-video w-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.instrument_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="opacity-40 text-sm italic">No image uploaded yet</p>
            )}
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Table className="w-5 h-5 opacity-60" />
              <h3 className="font-bold text-lg">Practice Details</h3>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider opacity-40 font-semibold">
                  Song List
                </h4>
                <p className="opacity-70 leading-relaxed">
                  {project.song_list || "No pieces played yet."}
                </p>
              </div>
              {project.status_notes && (
                <div>
                  <h4 className="text-xs uppercase tracking-wider opacity-40 font-semibold">
                    Status Notes
                  </h4>
                  <p className="opacity-80 leading-relaxed">
                    {project.status_notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        <section>
          <Tabs.Root defaultValue="stopwatch" className="flex flex-col">
            <Tabs.List className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/5">
              <Tabs.Trigger
                value="stopwatch"
                className="flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm opacity-60 data-[state=active]:opacity-100"
              >
                <CirclePlay className="w-4 h-4 mr-2" />
                Stopwatch
              </Tabs.Trigger>
              <Tabs.Trigger
                value="timer"
                className="flex-1 flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:shadow-sm opacity-60 data-[state=active]:opacity-100"
              >
                <TimerIcon className="w-4 h-4 mr-2" />
                Timer
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="stopwatch" className="outline-none">
              <Stopwatch />
            </Tabs.Content>
            <Tabs.Content value="timer" className="outline-none">
              <Timer />
            </Tabs.Content>
          </Tabs.Root>
        </section>
      </div>
    </main>
  );
}
