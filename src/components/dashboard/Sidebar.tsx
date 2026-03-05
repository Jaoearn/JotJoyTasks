import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

type StatType = {
  title: string;
  value: number;
};

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  stats: StatType[];
  tasks: { status: "todo" | "progress" | "done" }[];
};

const Sidebar = ({
  collapsed,
  setCollapsed,
  darkMode,
  setDarkMode,
  stats,
  tasks
}: Props) => {

  const totalTasks = tasks.length;
  const todoTasks = tasks.filter(t => t.status === "todo").length;
  const progressTasks = tasks.filter(t => t.status === "progress").length;
  const doneTasks = tasks.filter(t => t.status === "done").length;

  const progress = totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div
      className={`relative rounded-2xl shadow-lg transition-all duration-300
      ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
      ${collapsed ? "w-20 p-3" : "w-80 p-6"}`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-purple-500 text-white p-2 rounded-full shadow-md"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute right-4 top-4 p-2 rounded-lg transition ${
          darkMode ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Profile */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <img
          src="https://api.dicebear.com/7.x/bottts/svg"
          className="w-24 h-24 rounded-full border-4 border-purple-500"
        />

        {!collapsed && (
          <>
            <h2 className="text-xl font-bold text-center">
              Welcome, <span className="text-purple-400">Adventurer</span>
            </h2>

            <div className="w-full flex justify-between text-sm">
              <span>Tasks Progress</span>
              <span>{progress}%</span>
            </div>

            <div
              className={`w-full rounded-full h-2 ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      {!collapsed && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-xl p-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <div className="text-sm text-gray-400">{stat.title}</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;