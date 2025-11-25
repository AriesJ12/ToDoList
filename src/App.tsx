import "./App.css";

import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import ItemsCategories from "./components/ItemsCategories";
import Items from "./components/Items";
import { useState } from "react";
import {type Task, Status } from "./types";

function App() {
  const [items, setItems] = useState<Task[]>([]);

  const [itemLocations, setItemLocations] = useState<
    Record<string, UniqueIdentifier | null>
  >({});

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <form onSubmit={addTodo}>
        <input name="title" placeholder="Task title" />
        <textarea name="description" placeholder="Description"></textarea>
        <button type="submit">Add</button>
      </form>
      <main>
        {Status.map((statusId) => (
          <ItemsCategories key={statusId} id={statusId}>
            {items
              .filter((item) => itemLocations[item.id] === statusId)
              .map((item) => (
                <Items key={item.id} id={item.id}>
                  {item.title}
                </Items>
              ))}
          </ItemsCategories>
        ))}
      </main>
      <DragOverlay>
        <div>
          {activeId ? (
            "abc"
          ): null}
        </div>
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const newStatus = over.id as Status;

    // Update visual locations
    setItemLocations((prev) => ({
      ...prev,
      [active.id]: newStatus,
    }));

    // Update actual task status
    setItems((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, status: newStatus } : task
      )
    );
    setActiveId(null);
  }

  function addTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title")?.toString().trim() || "";
    const description = formData.get("description")?.toString().trim() || "";

    if (!title) return; // basic guard

    const newTask: Task = {
      id: String(Date.now()), // simple unique ID
      title,
      description,
      status: Status[0],
    };

    // Add task to items list
    setItems((prev) => [...prev, newTask]);

    // Register the task in DnD locations (initially not placed)
    setItemLocations((prev) => ({
      ...prev,
      [newTask.id]: newTask.status,
    }));

    form.reset();
  }
}

export default App;
