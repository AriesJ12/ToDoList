import { useDroppable } from "@dnd-kit/core";
import { type HTMLAttributes, type ReactNode } from "react";

interface TransferCategoryProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  mode: "left" | "right";
  children: ReactNode;
  type: "danger" | "safe"
}

function TransferCategory({
  id,
  mode,
  children,
  type,
  className,
  ...props
}: TransferCategoryProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  
  const droppingClass =
  type === "danger"
    ? isOver
      ? "bg-danger"
      : "bg-danger-secondary"
    : type === "safe"
    ? isOver
      ? "bg-safe"
      : "bg-safe-secondary"
    : "";

  return (
    <div
      ref={setNodeRef}
      className={`${getClassName()} ${className ?? ""} ${droppingClass} animate-slide-to-view`}
      {...props}
      style={{zIndex: 999, ...props.style}}
    >
      {children}
    </div>
  );

  function getClassName() {
    let className = "h-full p-2 flex justify-center items-center";

    if (mode === "left") {
      className += " absolute left-0 rounded-r-4xl";
    } else if (mode === "right") {
      className += " absolute right-0 rounded-l-4xl";
    }
    return className;
  }
}

export default TransferCategory;
