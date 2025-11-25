import { type ReactNode } from 'react'
import {useDroppable} from '@dnd-kit/core';

interface ItemsCategoriesProps{
  children?: ReactNode;
}

function ItemsCategories(props: ItemsCategoriesProps) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default ItemsCategories