import "./Body.css";

import {
  DndContext,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import ItemsCategories from "../components/ItemsCategories";
import Items from "../components/Items";
import { useState } from "react";
import { Status, type Task } from "../types";

function Body() {
  const [items, setItems] = useState<Task[]>([]);

  const [itemLocations, setItemLocations] = useState<
    Record<string, UniqueIdentifier | null>
  >({});

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <form onSubmit={addTodo}>
        <input name="title" placeholder="Task title" />
        <textarea name="description" placeholder="Description"></textarea>
        <button type="submit">Add</button>
      </form>
      <div style={{ padding: "20px" }}>
        {items
          .filter((item) => itemLocations[item.id] === null)
          .map((item) => (
            <Items key={item.id} id={item.id}>
              {item.title}
            </Items>
          ))}
      </div>
      <main>
        {Status.map((statusId) => (
          <ItemsCategories key={statusId} id={statusId}>
            <h3>{statusId}</h3>

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
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setItemLocations((prev) => ({
      ...prev,
      [active.id]: over.id,
    }));
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

export default Body;
