import { type ReactNode } from 'react'
import {useDraggable} from '@dnd-kit/core';

interface ItemsProps{
  children: ReactNode,
  id: string
}

function Items(props: ItemsProps) {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  )
}

export default Items