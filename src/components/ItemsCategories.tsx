import { type ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import type { Status } from "../types";

interface ItemsCategoriesProps {
  children?: ReactNode;
  id: Status;
}

function ItemsCategories(props: ItemsCategoriesProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  
  const statusColors: Record<(typeof Status)[number], string> = {
    "To Do": "#e9edc9",
    "In Progress": "#ccd5ae",
    "Done": "#d4a373",
  };

  const getStatusStyle = (status: typeof Status[number]) => ({
    backgroundColor: statusColors[status],
  });

  const beingDropped = {
    backgroundColor: isOver ? statusColors[props.id] : undefined,
    filter: isOver ? "grayscale(25%)": undefined,
  };

  return (
    <div className="rounded-md bg-fourth animate-drop-to-view h-100 flex flex-col" ref={setNodeRef}>
      <h3 className="text-center font-bold py-4 text-lg rounded-t-md" style={getStatusStyle(props.id)}>{props.id}</h3>
      <div className="p-5 overflow-auto flex-1" style={beingDropped}>
        {props.children}
      </div>
    </div>
  );
}

export default ItemsCategories;
