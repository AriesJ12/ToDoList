import {
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";

import ItemsCategories from "../components/ItemsCategories";
import Items from "../components/Items";
import { useEffect } from "react";
import { type Task, Status, Trash } from "../types";
import { useTaskStore } from "../hooks/task";
import ItemDesign from "../components/ItemDesign";
import TransferCategory from "../components/TransferCategory";

import TrashIcon from "../components/TrashIcon";
import { useTaskDrag } from "../hooks/taskDrag";
import Header from "../components/Header";

function Body() {
  // Zustand store
  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.add);
  const loadTask = useTaskStore((s) => s.load);

  const { activeId, handleDragStart, handleDragEnd, getActiveTaskDetails } =
    useTaskDrag();

  // Load tasks on initial mount
  useEffect(() => {
    loadTask();
  }, [loadTask]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-full">
        <Header onSubmit={addTodo}></Header>

        <main className="grid grid-cols-3 gap-5 flex-1 relative py-3 px-15">
          <TransferCategory mode="left" id={Trash[0]} type="danger">
            <TrashIcon />
          </TransferCategory>
          <TransferCategory mode="right" id={Trash[1]} type="danger">
            <TrashIcon />
          </TransferCategory>
          {Status.map((statusId) => (
            <ItemsCategories key={statusId} id={statusId}>
              {tasks
                .filter((task) => task.status === statusId)
                .map((task) => (
                  <Items key={task.id} id={task.id} value={task.details} className={activeId == task.id ? "opacity-50" : ""} />
                ))}
            </ItemsCategories>
          ))}
        </main>

        <DragOverlay>
          {activeId ? (
            <ItemDesign style={{
              border: "2px solid #d4a373"
            }}>{`${getActiveTaskDetails(activeId)}`}</ItemDesign>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );

  function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const details = formData.get("details")?.toString().trim() || "";
    if (!details) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      details,
      status: Status[0], // default "To Do"
    };

    addTask(newTask);

    form.reset();
  }
}

export default Body;
