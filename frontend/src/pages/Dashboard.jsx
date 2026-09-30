import React, { useEffect } from "react";
import {
  Plus,
  Folder,
  Clock3,
  Settings,
  LayoutDashboard,
  Search,
  GitBranch,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    name: "Dcode",
    description: "AI-powered code editor",
    stack: "React + Node.js",
    updated: "2 hours ago",
  },
  {
    name: "AI Playground",
    description: "Experiment with AI workflows",
    stack: "React + AI",
    updated: "Yesterday",
  },
  {
    name: "TaskFlow",
    description: "Real-time collaboration app",
    stack: "MERN + Socket.IO",
    updated: "3 days ago",
  },
];

const Dashboard = () => {
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Top Navbar */}
      <header className="h-16 border-b border-zinc-800/80 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center">
            <Code2 size={18} strokeWidth={2.5} />
          </div>

          <span className="text-lg font-semibold tracking-tight">
            Dcode
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-lg border border-zinc-800 bg-zinc-900/60 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition">
            <Search size={15} />
            <span>Search</span>
            <kbd className="ml-4 text-xs text-zinc-500">⌘ K</kbd>
          </button>

          <button className="h-9 w-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition">
            <GitBranch size={17} />
          </button>

          <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium">
            P
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 min-h-[calc(100vh-4rem)] border-r border-zinc-800/80 p-4 flex-col">
          <button className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-lg h-10 text-sm font-medium hover:bg-zinc-200 transition">
            <Plus size={17} />
            New Project
          </button>

          <nav className="mt-6 space-y-1">
            <NavItem
              icon={<LayoutDashboard size={17} />}
              label="Dashboard"
              active
            />

            <NavItem
              icon={<Folder size={17} />}
              label="Projects"
            />

            <NavItem
              icon={<Clock3 size={17} />}
              label="Recent"
            />
          </nav>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="px-3 mb-2 text-[11px] uppercase tracking-wider text-zinc-500">
              Workspace
            </p>

            <NavItem
              icon={<Sparkles size={17} />}
              label="AI Templates"
            />

            <NavItem
              icon={<Settings size={17} />}
              label="Settings"
            />
          </div>

          <div className="mt-auto">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-zinc-300" />
                <span className="text-sm font-medium">
                  Dcode AI
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-500">
                Build faster with your AI coding assistant.
              </p>

              <button className="mt-3 text-xs text-zinc-300 hover:text-white flex items-center gap-1">
                Explore AI
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
          {/* Hero */}
          <section>
            <p className="text-sm text-zinc-500">
              Workspace
            </p>

            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
              Good morning, Prabhat.
            </h1>

            <p className="mt-2 text-zinc-500">
              What are you building today?
            </p>
          </section>

          {/* Quick Actions */}
          <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="group text-left rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900 transition">
              <div className="h-10 w-10 rounded-xl bg-white text-black flex items-center justify-center">
                <Plus size={20} />
              </div>

              <h3 className="mt-5 font-medium">
                Create new project
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Start from scratch with an AI-ready workspace.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-white transition">
                Get started
                <ArrowUpRight size={13} />
              </div>
            </button>

            <button className="group text-left rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900 transition">
              <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <Folder size={20} />
              </div>

              <h3 className="mt-5 font-medium">
                Open existing project
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Continue working on one of your projects.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs text-zinc-400 group-hover:text-white transition">
                Browse projects
                <ArrowUpRight size={13} />
              </div>
            </button>
          </section>

          {/* Recent Projects */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-medium">
                  Recent projects
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  Continue where you left off.
                </p>
              </div>

              <button className="text-sm text-zinc-400 hover:text-white transition">
                View all
              </button>
            </div>

            <div className="border border-zinc-800 rounded-2xl overflow-hidden">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  className={`group flex items-center justify-between p-5 hover:bg-zinc-900/70 transition ${index !== projects.length - 1
                      ? "border-b border-zinc-800"
                      : ""
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                      <Code2 size={18} className="text-zinc-400" />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">
                        {project.name}
                      </h3>

                      <p className="text-xs text-zinc-500 mt-1">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-8">
                    <span className="text-xs text-zinc-500">
                      {project.stack}
                    </span>

                    <span className="text-xs text-zinc-600">
                      {project.updated}
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="text-zinc-600 group-hover:text-zinc-300 transition"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${active
          ? "bg-zinc-800 text-white"
          : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Dashboard;
