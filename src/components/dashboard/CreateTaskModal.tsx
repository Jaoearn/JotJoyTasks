import { useState } from "react";
import { Save, X, Plus } from "lucide-react";
import { Modal } from "../../components/ui/Modal";

export type TaskStatus = "todo" | "progress" | "done";

export type TaskItemType = {
  title: string;
  reward: string;
  status: TaskStatus;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  addTask: (task: TaskItemType) => void;
};

const CreateTaskModal = ({ isOpen, onClose, addTask }: Props) => {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;

    addTask({
      title,
      reward,
      status: "todo",
    });

    setTitle("");
    setReward("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

          <h4 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white">
            <Plus className="w-5 h-5 text-purple-500" />
            Create Task
          </h4>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-800">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              className="border rounded-md px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Reward
            </label>

            <input
              type="text"
              placeholder="ex. strength +10"
              className="border rounded-md px-3 py-2 dark:bg-gray-900 dark:border-gray-700"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">

          <div className="flex items-center justify-end gap-3">

            <button
              onClick={onClose}
              className="border border-gray-400 px-3.5 py-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={handleAdd}
              className="border border-purple-600 bg-white dark:bg-[#1e1e2f] dark:hover:bg-purple-600 text-purple-500 hover:bg-purple-600 hover:text-white font-semibold px-3.5 py-2 rounded-md transition-colors text-sm flex items-center gap-1.5"
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