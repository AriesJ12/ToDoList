import { useDroppable } from "@dnd-kit/core";
import { type HTMLAttributes, type ReactNode } from "react";

interface TransferCategoryProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  mode: "left" | "right";
  children: ReactNode;
}

function TransferCategory({
  id,
  mode,
  children,
  className,
  ...props
}: TransferCategoryProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={getClassName(mode)}
      {...props}
    >
      {children}
    </div>
  );

  function getClassName(mode: "left" | "right") {
    let className = "";

    if (mode === "left") {
      className = "absolute left-0 rounded-r-lg";
    } else if (mode === "right") {
      className = "absolute right-0 rounded-l-lg";
    }

    return className;
  }
}

export default TransferCategory;
