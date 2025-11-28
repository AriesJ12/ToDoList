import {useDraggable} from '@dnd-kit/core';
import ItemDesign from './ItemDesign';


export interface ItemsProps{
  value: string;
  id: string
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
    >
      {props.value}
    </ItemDesign>

  )
}

export default Items