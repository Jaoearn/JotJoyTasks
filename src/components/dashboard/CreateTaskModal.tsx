import { useState } from "react";
import { Save, Plus } from "lucide-react";
import { Modal } from "../ui/Modal";

export type TaskStatus = "todo" | "progress" | "done";

export type TaskItemType = {
  title: string;
  detail: string;
  status: TaskStatus;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addTask: (task: TaskItemType) => void;
  darkMode: boolean;
};

const CreateTaskModal = ({
  isOpen,
  onClose,
  addTask,
  darkMode,
}: Props) => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask({
      title,
      detail,
      status: "todo",
    });

    setTitle("");
    setDetail("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      darkMode={darkMode}
    >
      <>
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b
          ${darkMode ? "border-gray-700": "border-gray-200"}`}
        >
          <h4
            className={`flex items-center gap-2 text-xl font-semibold
            ${darkMode ? "text-white" : "text-gray-800"}`}
          >
            <Plus className="w-5 h-5 text-purple-500" />
            Create Task
          </h4>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col gap-4 p-6`}
        >
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label
              className={`text-sm
              ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`border rounded-md px-3 py-2
              ${
                darkMode
                  ? "bg-gray-900 text-white border-gray-700 placeholder-gray-500"
                  : "bg-white text-gray-800 border-gray-300"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>

          {/* Detail */}
          <div className="flex flex-col gap-1">
            <label
              className={`text-sm
              ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              Detail
            </label>

            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="ex. strength +10"
              className={`border rounded-md px-3 py-2 h-32 resize-none
              ${
                darkMode
                  ? "bg-gray-900 text-white border-gray-700 placeholder-gray-500"
                  : "bg-white text-gray-800 border-gray-300"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className={`border-t p-4
          ${darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center justify-end gap-3">
            {/* Cancel */}
            <button
              onClick={onClose}
              className={`px-3.5 py-2 rounded-md text-sm border
              ${
                darkMode
                  ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>

            {/* Save */}
            <button
              onClick={handleAdd}
              className={`px-3.5 py-2 rounded-md text-sm flex items-center gap-1.5 font-semibold transition-colors
              ${
                darkMode
                  ? "bg-purple-600 text-white hover:bg-purple-500"
                  : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default CreateTaskModal;