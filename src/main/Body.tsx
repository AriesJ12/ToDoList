import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

import ItemsCategories from "../components/ItemsCategories";
import Items from "../components/Items";
import { useState, useEffect } from "react";
import { type Task, Status } from "../types";
import { useTaskStore } from "../hooks/task";

function Body() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // Zustand store
  const tasks = useTaskStore((s) => s.tasks);
  const addTask = useTaskStore((s) => s.add);
  const updateTask = useTaskStore((s) => s.update);
  const loadTask = useTaskStore((s) => s.load);

  // Load tasks on initial mount
  useEffect(() => {
    loadTask();
  }, [loadTask]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <form onSubmit={addTodo}>
        <input name="details" placeholder="Details" />
        <button type="submit">Add</button>
      </form>

      <main className="grid grid-cols-3 gap-5 h-full">
        {Status.map((statusId) => (
          <ItemsCategories key={statusId} id={statusId}>
            {tasks
              .filter((task) => task.status === statusId)
              .map((task) => (
                <Items key={task.id} id={task.id}>
                  {task.details}
                </Items>
              ))}
          </ItemsCategories>
        ))}
      </main>

      <DragOverlay>
        {activeId ? <div>abc</div> : null}
      </DragOverlay>
    </DndContext>
  );

  /* ---------------------- Handlers ---------------------- */

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id as Status;

    const existing = tasks.find((t) => t.id === active.id);
    if (!existing) return;

    updateTask({ ...existing, status: newStatus });

    setActiveId(null);
  }

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
