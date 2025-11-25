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
  const style = {
    color: isOver ? "green" : undefined,
  };
  const statusColors: Record<(typeof Status)[number], string> = {
    "To Do": "#e9edc9",
    "In Progress": "#ccd5ae",
    "Done": "#d4a373",
  };

  const getStatusStyle = (status: typeof Status[number]) => ({
    backgroundColor: statusColors[status],
  });

  return (
    <div className="category" ref={setNodeRef}>
      <h3 style={getStatusStyle(props.id)}>{props.id}</h3>
      <div className="draggableContainer" style={style}>
        {props.children}
      </div>
    </div>
  );
}

export default ItemsCategories;
