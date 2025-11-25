import { type ReactNode } from 'react'
import {useDroppable} from '@dnd-kit/core';

interface ItemsCategoriesProps{
  children?: ReactNode;
  id: string;
}

function ItemsCategories(props: ItemsCategoriesProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div ref={setNodeRef} style={style} >
      {props.children}
    </div>
  );
}

export default ItemsCategories