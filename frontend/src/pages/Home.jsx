import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover } from "../components/ui/Popover";
import { logout } from "../features/logout";
import { setUserData } from "../redux/userSlice";
import { getProjects, getStarredProjects } from "../features/project";
import { setProjects, setStarredProjects } from "../redux/projectSlice";
import Tab from "../components/Tabs";




const Home = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const initials = userData?.name ? userData.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await logout();
      dispatch(setUserData(null));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const fetchProjects = async () => {
    try {
      const Projects = await getProjects();

      console.log("Projects fetched:", Projects);

      if (projects) {
        dispatch(setProjects(projects));
      }

    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  const fetchStarredProjects = async () => {
    try {
      const starredProjects = await getStarredProjects();

      console.log("Starred Projects fetched:", starredProjects);

      if (starredProjects) {
        dispatch(setStarredProjects(starredProjects));
      }

    } catch (error) {
      console.error("Error fetching starred projects:", error);
    }
  }

  // useEffect(() => {
  //   if (userData) {
  //     fetchProjects();
  //     fetchStarredProjects();
  //   }
  // }, [userData]);

  // if (!userData) {
  //   navigate("/login");
  // }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Top Navbar */}
      <header className="h-16 border-b border-zinc-800/80 flex items-center justify-between px-6 select-none">

        {/* Left: Dcode + Menubar */}
        <div className="flex items-center gap-6">

          {/* Dcode */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white text-black flex items-center justify-center">
              <Code2 size={18} strokeWidth={2.5} />
            </div>

            <span className="text-lg font-semibold tracking-tight">
              Dcode
            </span>
          </div>

          {/* Mac-style Menu */}
          <nav className="hidden md:flex items-center gap-1">

            {["File", "Edit", "View", "Project", "Run", "Help"].map((item) => (
              <button
                key={item}
                className="
          px-3 py-1.5
          rounded-md
          text-sm text-zinc-400
          hover:text-zinc-100
          hover:bg-zinc-800/70
          transition
        "
              >
                {item}
              </button>
            ))}

          </nav>

        </div>


        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button
            className="
      hidden sm:flex items-center gap-2
      h-9 px-3
      rounded-lg
      border border-zinc-800
      bg-zinc-900/60
      text-sm text-zinc-400
      hover:text-zinc-200
      hover:bg-zinc-800
      transition
    "
          >
            <Search size={15} />

            <span>Search</span>

            <kbd className="ml-4 text-xs text-zinc-500">
              ⌘ K
            </kbd>
          </button>


          {/* Git */}
          <button
            className="
      h-9 w-9
      rounded-lg
      flex items-center justify-center
      text-zinc-400
      hover:text-white
      hover:bg-zinc-800
      transition
    "
          >
            <GitBranch size={17} />
          </button>


          {/* Avatar */}
          <div
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="
      h-9 w-9
      rounded-full
      bg-zinc-800
      border border-zinc-700
      flex items-center justify-center
      text-sm font-medium
      cursor-pointer
      hover:bg-zinc-700
      transition
      select-none
    "
          >
            {initials}
          </div>


          {/* Popover */}
          <Popover
            content={
              <div className="flex flex-col gap-2">

                <button className="w-full text-left px-3 rounded-lg hover:bg-zinc-800 transition">
                  {userData?.name || "User"}

                  {userData?.email && (
                    <p className="text-xs text-zinc-500">
                      {userData.email}
                    </p>
                  )}
                </button>

                <button className="w-full text-left px-3 rounded-lg hover:bg-zinc-800 transition">
                  <Settings size={15} className="inline-block mr-2" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="
            w-full text-left px-3
            rounded-lg
            text-red-400
            hover:bg-zinc-800
            transition
          "
                >
                  <ArrowUpRight size={15} className="inline-block mr-2" />
                  Logout
                </button>

              </div>
            }
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
          />

        </div>

      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 min-h-[calc(100vh-4rem)] border-r border-zinc-800/80 p-4 flex-col">
          <button className="w-full flex items-center justify-center gap-2 text-white  h-10 text-sm font-medium hover:bg-zinc-200 rounded-4xl transition border border-[#313131] hover:text-black">
            <Plus size={17} />
            New Project
          </button>

          <nav className="mt-6 space-y-1">
            <NavItem
              setActiveTab={setActiveTab}
              activeTab={"dashboard"}
              icon={<LayoutDashboard size={17} />}
              label="Dashboard"
            />

            <NavItem
              setActiveTab={setActiveTab}
              activeTab={"projects"}
              icon={<Folder size={17} />}
              label="Projects"
            />

            <NavItem
              setActiveTab={setActiveTab}
              activeTab={"recent"}
              icon={<Clock3 size={17} />}
              label="Recent"
            />

            <NavItem
              setActiveTab={setActiveTab}
              activeTab={"starred"}
              icon={<Star size={17} />}
              label="Starred"
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
            <div className="flex flex-col rounded-xl  p-4">
              <button className="mt-3 flex justify-center text-xs rounded-4xl  bg-[#212121] flex items-center gap-1 text-white px-3 py-1.5  hover:bg-zinc-200 transition border border-[#313131] hover:text-black">
                <Gift size={13} /> Claim Offer
              </button>
            </div>
          </div>
        </aside>

        <Tab activeTab={activeTab} />

      </div>


    </div>

  );
};

const NavItem = ({ icon, label, active = false, activeTab, setActiveTab }) => {
  return (
    <button
      onClick={() => setActiveTab(activeTab)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${active
        ? "bg-zinc-800 text-white"
        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 "
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

export default Home;
