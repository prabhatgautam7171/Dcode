import React, { useState } from 'react'
import { useSelector } from 'react-redux';
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
  User2,
  Star,
  Gift,
} from "lucide-react";
import CreateProjectModal from './CreateProjectModal';
import { AnimatePresence } from 'framer-motion';

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
  console.log("Dashboard component rendered");
  const { userData } = useSelector(state => state.user);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const greetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌞 Good morning";
    if (hour < 18) return "🌇 Good afternoon";
    return "🌄 Good evening";
  }

  return (
    <>
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Hero */}
        <section>


          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">
            {greetingMessage()}, {userData?.name.split(" ")[0] || "User"}!
          </h1>

          <p className="mt-2 text-zinc-500">
            What are you building today?
          </p>
        </section>

        {/* Quick Actions */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="group text-left rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900 transition">
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

    </>
  );
};

export default Dashboard;
