import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Folder,
  MoreHorizontal,
  ArrowUpRight,
  Code2,
  Clock3,
} from "lucide-react";
import { getProjects } from "../features/project";
import { AnimatePresence } from "framer-motion";
import CreateProjectModal from "./CreateProjectModal";

// const projects = [
//   {
//     name: "Dcode",
//     description: "AI-powered code editor and development workspace",
//     stack: "React · Node.js",
//     updated: "Today",
//   },
//   {
//     name: "GlideGo",
//     description: "Full-stack train reservation system",
//     stack: "Next.js · MongoDB",
//     updated: "2 days ago",
//   },
//   {
//     name: "Luna AI",
//     description: "Local AI desktop assistant",
//     stack: "Electron · React",
//     updated: "5 days ago",
//   },
//   {
//     name: "SooN",
//     description: "Real-time video meeting platform",
//     stack: "React · WebRTC",
//     updated: "1 week ago",
//   },
// ];

const Project = () => {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleGetProjects = async () => {
    try {
      setLoading(true);

      const response = await getProjects();

      console.log("Projects:", response.data);

      setProjects(response.data.projects || response.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch projects:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProjects();
  }, []);

  return (
    <>
      <main className="flex-1 min-h-[calc(100vh-4rem)] bg-[#09090b] text-white">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Workspace
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Projects
              </h1>

              <p className="mt-2 text-sm text-zinc-500">
                Your development projects in one place.
              </p>
            </div>

            <button
             onClick={() => setIsCreateModalOpen(true)}
             className="flex items-center gap-2 bg-white text-black px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-200 transition">
              <Plus size={16} />
              New Project
            </button>
          </div>

          {/* Toolbar */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="text"
                placeholder="Search projects..."
                className="w-full h-10 pl-9 pr-4 rounded-lg bg-zinc-900/70 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-700 transition"
              />
            </div>

            <span className="text-xs text-zinc-500">
              {projects.length} projects
            </span>
          </div>

          {/* Projects */}
          <section className="mt-6 border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/40">

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[1fr_180px_120px_40px] gap-4 px-5 py-3 border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-600">
              <span>Project</span>
              <span>Stack</span>
              <span>Updated</span>
              <span />
            </div>

            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`group grid grid-cols-1 sm:grid-cols-[1fr_180px_120px_40px] gap-4 items-center px-5 py-5 hover:bg-zinc-900/60 transition ${index !== projects.length - 1
                  ? "border-b border-zinc-800"
                  : ""
                  }`}
              >
                {/* Project Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <Code2
                      size={18}
                      className="text-zinc-400 group-hover:text-white transition"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-medium truncate">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500 truncate">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Stack */}
                <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
                  <Folder size={14} />
                  <span>Project</span>
                </div>

                {/* Updated */}
                <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600">
                  <Clock3 size={13} />
                  <span>
                    {new Date(project.lastOpenedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Open */}
                <button
                  className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md text-zinc-600 hover:text-white hover:bg-zinc-800 transition"
                >
                  <ArrowUpRight size={15} />
                </button>

                {/* Mobile action */}
                <button className="sm:hidden absolute right-5 text-zinc-600 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            ))}
          </section>

          {/* Empty space / footer */}
          <div className="mt-6 flex items-center justify-between text-xs text-zinc-600">
            <span>Projects are synced with your workspace.</span>

            <button className="hover:text-zinc-300 transition">
              View activity
            </button>
          </div>

          <AnimatePresence>
            {isCreateModalOpen && (
              <CreateProjectModal
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={(project) => {
                  console.log("New project:", project);
                  setIsCreateModalOpen(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

    </>
  );
};

export default Project;
