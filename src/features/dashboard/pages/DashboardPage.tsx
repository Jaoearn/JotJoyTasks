import { useState } from "react";
import Sidebar from "../../../components/dashboard/Sidebar";
import KanbanBoard, { type TaskItemType } from "../../../components/dashboard/KanbanBoard";
import CreateTaskModal from "../../../components/dashboard/CreateTaskModal";

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [taskslist, setTasksList] = useState<TaskItemType[]>([
    { title: "Complete your first Task", reward: "strength +10", status: "todo" },
    { title: "Collect 100 coins", reward: "coins +10", status: "todo" },
    { title: "Improve intelligence", reward: "intelligence +10", status: "progress" },
    { title: "Help a friend", reward: "charisma +10", status: "done" },
  ]);

  const stats = [
    {
      title: "To Do",
      value: taskslist.filter((t) => t.status === "todo").length
    },
    {
      title: "In Progress",
      value: taskslist.filter((t) => t.status === "progress").length
    },
    {
      title: "Done",
      value: taskslist.filter((t) => t.status === "done").length
    }
  ];

  const addTask = (task: TaskItemType) => {
    setTasksList((prev) => [...prev, task]);
  };

  return (
    <div className={`flex h-screen p-6 gap-6 ${darkMode ? "bg-[#0f0f12] text-white" : "bg-gray-100"}`}>
      
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        stats={stats}
        tasks={taskslist}
      />

      <div className={`flex-1 rounded-2xl p-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Active Tasks</h1>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-purple-500 px-4 py-2 rounded-lg text-white"
          >
            + New Task
          </button>
        </div>

        <KanbanBoard
          tasks={taskslist}
          setTasks={setTasksList}
          darkMode={darkMode}
        />

      </div>

      <CreateTaskModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        addTask={addTask}
      />

    </div>
  );
};

export default DashboardPage;