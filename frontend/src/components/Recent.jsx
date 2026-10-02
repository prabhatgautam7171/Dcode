import React from "react";
import {
  Search,
  Code2,
  Clock3,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const recentProjects = [
  {
    name: "Dcode",
    description: "AI-powered code editor and development workspace",
    stack: "React · Node.js",
    opened: "Today",
  },
  {
    name: "GlideGo",
    description: "Full-stack train reservation system",
    stack: "Next.js · MongoDB",
    opened: "Yesterday",
  },
  {
    name: "Luna AI",
    description: "Local AI desktop assistant",
    stack: "Electron · React",
    opened: "3 days ago",
  },
  {
    name: "SooN",
    description: "Real-time video meeting platform",
    stack: "React · WebRTC",
    opened: "5 days ago",
  },
];

const Recent = () => {
  console.log("Recent component rendered");

  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)] bg-[#09090b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Recent
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Pick up where you left off.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
            />

            <input
              type="text"
              placeholder="Search recent projects..."
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-zinc-900/70 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-700 transition"
            />
          </div>

          <span className="text-xs text-zinc-500">
            {recentProjects.length} recently opened
          </span>
        </div>

        {/* Recent Projects */}
        <section className="mt-6 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/40">

          {recentProjects.map((project, index) => (
            <div
              key={project.name}
              className={`group flex items-center justify-between px-5 py-5 hover:bg-zinc-900/60 transition ${
                index !== recentProjects.length - 1
                  ? "border-b border-zinc-800"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Code2
                    size={18}
                    className="text-zinc-400 group-hover:text-white transition"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-medium">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500 truncate">
                    {project.description}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-[11px] text-zinc-600">
                    <span>{project.stack}</span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={11} />
                      {project.opened}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-white hover:bg-zinc-800 transition">
                  <ArrowUpRight size={15} />
                </button>

                <button className="sm:hidden text-zinc-600 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Recent;
