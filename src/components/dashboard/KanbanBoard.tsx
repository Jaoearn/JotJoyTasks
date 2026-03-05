import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export interface TaskItemType {
  title: string;
  reward: string;
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
    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
      
        const { source, destination } = result;
      
        const sourceStatus = source.droppableId;
        const destStatus = destination.droppableId;
      
        const newTasks = [...tasks];
      
        // หา task ที่ถูกลากจาก column เดิม
        const sourceTasks = newTasks.filter((t) => t.status === sourceStatus);
        const movedTask = sourceTasks[source.index];
      
        if (!movedTask) return;
      
        // ลบ task ตัวนั้นออกจาก list หลัก
        const filteredTasks = newTasks.filter((t) => t !== movedTask);
      
        // เปลี่ยน status
        movedTask.status = destStatus;
      
        // ต่อท้าย
        filteredTasks.push(movedTask);
      
        setTasks(filteredTasks);
    };

  return (
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
                        key={index}
                        draggableId={task.title + index}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`rounded-xl p-4 flex justify-between ${
                              darkMode ? "bg-gray-800" : "bg-gray-100"
                            }`}
                          >
                            <div>
                              <div className="font-semibold">
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-400">
                                Complete this task
                              </div>
                            </div>

                            <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg">
                              {task.reward}
                            </div>
                          </div>
                        )}
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
  );
};

export default KanbanBoard;