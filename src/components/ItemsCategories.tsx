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
    <div className="rounded-md bg-fourth" ref={setNodeRef}>
      <h3 className="text-center font-semibold" style={getStatusStyle(props.id)}>{props.id}</h3>
      <div className="flex flex-col justify-center items-center flex-wrap" style={style}>
        {props.children}
      </div>
    </div>
  );
}

export default ItemsCategories;
