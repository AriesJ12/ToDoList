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
    <div className="rounded-md bg-fourth overflow-hidden" ref={setNodeRef}>
      <h3 className="text-center font-bold py-4 text-lg" style={getStatusStyle(props.id)}>{props.id}</h3>
      <div className="flex flex-col justify-center items-stretch flex-wrap gap-3 p-5" style={style}>
        {props.children}
      </div>
    </div>
  );
}

export default ItemsCategories;
