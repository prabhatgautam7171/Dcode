import React from "react";
import {
  Star,
  Code2,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const starredProjects = [
  {
    name: "Dcode",
    description: "AI-powered code editor and development workspace",
    stack: "React · Node.js",
  },
  {
    name: "GlideGo",
    description: "Full-stack train reservation system",
    stack: "Next.js · MongoDB",
  },
  {
    name: "Luna AI",
    description: "Local AI desktop assistant",
    stack: "Electron · React",
  },
];

const Starred = () => {
  console.log("Starred component rendered");

  return (
    <main className="flex-1 min-h-[calc(100vh-4rem)] bg-[#09090b] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
            <Star size={13} />
            Workspace
          </div>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Starred
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Your bookmarked projects and workspaces.
          </p>
        </div>

        {/* Projects */}
        <section className="mt-10 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/40">

          {starredProjects.map((project, index) => (
            <div
              key={project.name}
              className={`group flex items-center justify-between px-5 py-5 hover:bg-zinc-900/60 transition ${
                index !== starredProjects.length - 1
                  ? "border-b border-zinc-800"
                  : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Code2
                    size={18}
                    className="text-zinc-400 group-hover:text-white transition"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    {project.description}
                  </p>

                  <p className="mt-2 text-[11px] text-zinc-600">
                    {project.stack}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Star
                  size={15}
                  fill="currentColor"
                  className="text-zinc-300"
                />

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

        {/* Footer */}
        <div className="mt-5 text-xs text-zinc-600">
          {starredProjects.length} starred projects
        </div>
      </div>
    </main>
  );
};

export default Starred;
