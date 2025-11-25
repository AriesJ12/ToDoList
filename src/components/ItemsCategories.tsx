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

  };
  return (
    <div className='category' ref={setNodeRef} >
      <h3>{props.id}</h3>
      <div className="draggableContainer" style={style} >
        {props.children}
      </div>
    </div>
  );
}

export default ItemsCategories