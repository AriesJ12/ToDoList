import { useState } from "react";
import { useTaskStore } from "./task";
import { DropId, Status, Trash } from "../types";
import type { DragStartEvent, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

export function useTaskDrag() {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const tasks = useTaskStore(s => s.tasks);
  const updateTask = useTaskStore(s => s.update);
  const removeTask = useTaskStore(s => s.remove);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const dropId = over.id as DropId;
    const existing = tasks.find(t => t.id === active.id);
    if (!existing) return;

    if (Trash.includes(dropId)) {
      removeTask(existing.id);
      setActiveId(null);
      return;
    }

    const validId = dropId as Status;
    updateTask({ ...existing, status: validId });

    setActiveId(null);
  }

  function getActiveTaskDetails(id: UniqueIdentifier) {
    return tasks.find(task => task.id === id)?.details ?? "";
  }

  return {
    activeId,
    handleDragStart,
    handleDragEnd,
    getActiveTaskDetails,
  };
}
