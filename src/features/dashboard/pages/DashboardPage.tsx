import { useState } from "react";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex h-screen p-6 gap-6 transition-all duration-300 ${
        darkMode ? "bg-[#0f0f12] text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`relative rounded-2xl shadow-lg transition-all duration-300 
        ${darkMode ? "bg-gray-900" : "bg-white"} 
        ${collapsed ? "w-20 p-3" : "w-80 p-6"}`}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-10 bg-purple-500 text-white p-2 rounded-full"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`absolute right-4 top-4 p-2 rounded-lg ${
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
              <h2 className="text-xl font-bold">
                Welcome, <span className="text-purple-400">Adventurer</span>
              </h2>

              <div className="w-full flex justify-between text-sm">
                <span>Level 0</span>
                <span>XP: 50/100</span>
              </div>

              <div
                className={`w-full rounded-full h-2 ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-1/2"></div>
              </div>
            </>
          )}
        </div>

        {/* Stats */}
        {!collapsed && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Stat title="Strength" value={20} darkMode={darkMode} />
            <Stat title="Intelligence" value={20} darkMode={darkMode} />
            <Stat title="Charisma" value={20} darkMode={darkMode} />
            <Stat title="Creativity" value={20} darkMode={darkMode} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 rounded-2xl p-6 overflow-y-auto transition-all ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Active Quests</h1>

          <button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-white">
            + New Quest
          </button>
        </div>

        <div className="space-y-4">
          <Quest
            title="Complete your first quest"
            reward="strength +10"
            darkMode={darkMode}
          />
          <Quest
            title="Collect 100 coins"
            reward="coins +10"
            darkMode={darkMode}
          />
          <Quest
            title="Improve your intelligence"
            reward="intelligence +10"
            darkMode={darkMode}
          />
          <Quest
            title="Help a friend"
            reward="charisma +10"
            darkMode={darkMode}
          />
          <Quest
            title="Craft a new item"
            reward="creativity +10"
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ title, value, darkMode }: any) => {
  return (
    <div
      className={`rounded-xl p-4 ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
};

const Quest = ({ title, reward, darkMode }: any) => {
  return (
    <div
      className={`rounded-xl p-4 flex justify-between items-center ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-400">Complete this quest</div>
      </div>

      <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg text-sm">
        {reward}
      </div>
    </div>
  );
};

export default DashboardPage;