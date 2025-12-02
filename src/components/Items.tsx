import {useDraggable} from '@dnd-kit/core';
import ItemDesign from './ItemDesign';

export interface ItemsProps{
  value: string;
  id: string;
  className?: string;
}

function Items(props: ItemsProps) {

  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });

  return (
    <ItemDesign
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={props.className}
    >
      {props.value}
    </ItemDesign>

  )
}

export default Items