import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Modal } from "../ui/Modal";
import { Save } from "lucide-react";

export interface TaskItemType {
  title: string;
  detail: string;
  status: "todo" | "progress" | "done";
}

interface Props {
  tasks: TaskItemType[];
  setTasks: (tasks: TaskItemType[]) => void;
  darkMode: boolean;
}

const columns = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const KanbanBoard = ({ tasks, setTasks, darkMode }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskItemType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const openModal = (
    task: TaskItemType,
    index: number,
    status: string
  ) => {
    setSelectedTask(task);
    setSelectedIndex(index);
    setSelectedStatus(status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
    setSelectedIndex(null);
    setSelectedStatus(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceTasks = tasks.filter(
      (t) => t.status === source.droppableId
    );
    const movedTask = sourceTasks[source.index];

    if (!movedTask) return;

    const updated = tasks.filter((t) => t !== movedTask);
    movedTask.status = destination.droppableId;

    updated.push(movedTask);
    setTasks(updated);
  };

  const handleSave = () => {
    if (
      selectedTask === null ||
      selectedIndex === null ||
      selectedStatus === null
    )
      return;

    let count = -1;

    const updated = tasks.map((t) => {
      if (t.status === selectedStatus) {
        count++;
        if (count === selectedIndex) {
          return selectedTask;
        }
      }
      return t;
    });

    setTasks(updated);
    closeModal();
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6 h-[80vh]">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.id
            );

            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div className="flex flex-col">
                    <h2 className="font-bold mb-4">{column.title}</h2>

                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex flex-col gap-4 p-2 rounded-xl overflow-y-auto h-[70vh] ${
                        darkMode ? "bg-gray-900" : "bg-gray-50"
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={task.title + index}
                          draggableId={task.title + index}
                          index={index}
                        >
                          {(provided) => {
                            const isDone = task.status === "done";

                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (task.status === "done") return;
                                  openModal(task, index, column.id);
                                }}
                                className={`rounded-xl p-4 flex justify-between transition-all cursor-pointer
                                ${darkMode ? "bg-gray-800" : "bg-gray-100"}
                                ${isDone ? "opacity-60" : ""}
                                `}
                              >
                                <div
                                  className={`min-w-0 ${
                                    isDone ? "line-through text-gray-400" : ""
                                  }`}
                                >
                                  <div className="font-semibold truncate">
                                    {task.title}
                                  </div>

                                  <div
                                    className={`text-sm overflow-hidden text-ellipsis whitespace-nowrap ${
                                      isDone
                                        ? "text-gray-500 line-through"
                                        : "text-gray-400"
                                    }`}
                                  >
                                    {task.detail}
                                  </div>
                                </div>
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}

                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>

      {/* ✅ Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        darkMode={darkMode}
        className={`p-2 md:p-6 max-w-3xl rounded-xl
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}
      `}
      >
        <>
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-lg font-semibold">
              Task Detail
            </h4>
          </div>

          {selectedTask && (
            <form
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="custom-scrollbar max-h-[50vh] overflow-y-auto px-2">
                <div
                  className={`grid grid-cols-2 gap-6 px-2 pb-3
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
                >

                  {/* Title */}
                  <div className="col-span-2">
                    <label className="block mb-1 text-xs font-medium">
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedTask.title}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          title: e.target.value,
                        })
                      }
                      className={`w-full rounded border px-2 py-1 text-sm
                      ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    />
                  </div>

                  {/* Detail */}
                  <div className="col-span-2">
                    <label className="block mb-1 text-xs font-medium">
                      Detail
                    </label>
                    <textarea
                      value={selectedTask.detail}
                      onChange={(e) =>
                        setSelectedTask({
                          ...selectedTask,
                          detail: e.target.value,
                        })
                      }
                      className={`w-full h-40 rounded border px-2 py-1 text-sm
                      ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`px-3.5 py-2 rounded-md text-sm border
                  ${
                    darkMode
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Close
                </button>

                <button
                  type="submit"
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
            </form>
          )}
        </>
      </Modal>
    </>
  );
};

export default KanbanBoard;