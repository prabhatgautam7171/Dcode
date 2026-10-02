import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, FolderPlus, ChevronDown } from "lucide-react";
import { createProject } from "../features/project";

const CreateProjectModal = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState("Blank Project");
  const [visibility, setVisibility] = useState("Private");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim()) return;

    const projectData = {
      name: projectName.trim(),
      description: description.trim(),
      template,
      visibility,
    };

    try {
      const response = await createProject(projectData);

      console.log("Project created:", response);


      // onCreate?.(response);

      // onClose?.();
    } catch (error) {
      console.error(
        "Failed to create project:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-lg bg-[#0f0f11] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 12,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 8,
        }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-zinc-800">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center">
              <FolderPlus size={18} className="text-zinc-300" />
            </div>

            <div>
              <h2 className="text-base font-medium text-white">
                Create project
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Start a new workspace in Dcode.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition"
          >
            <X size={17} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-5">

            {/* Project Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Project name
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-awesome-project"
                autoFocus
                className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-zinc-600 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Description
                <span className="text-zinc-600 ml-1">
                  (optional)
                </span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What are you building?"
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 outline-none resize-none focus:border-zinc-600 transition"
              />
            </div>

            {/* Template */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Template
              </label>

              <div className="relative">
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="appearance-none w-full h-10 px-3 pr-10 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 outline-none focus:border-zinc-600 transition cursor-pointer"
                >
                  <option>Blank Project</option>
                  <option>React</option>
                  <option>Next.js</option>
                  <option>Node.js</option>
                  <option>MERN Stack</option>
                </select>

                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
                />
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Visibility
              </label>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisibility("Private")}
                  className={`h-10 rounded-lg border text-sm transition ${visibility === "Private"
                      ? "border-zinc-600 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  Private
                </button>

                <button
                  type="button"
                  onClick={() => setVisibility("Public")}
                  className={`h-10 rounded-lg border text-sm transition ${visibility === "Public"
                      ? "border-zinc-600 bg-zinc-800 text-white"
                      : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  Public
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-950/40">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-4 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!projectName.trim()}
              className="h-9 px-4 rounded-lg bg-white text-black text-sm font-medium hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Create project
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateProjectModal;
