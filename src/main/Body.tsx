import '../App.css'

import {DndContext, type DragEndEvent, type UniqueIdentifier} from '@dnd-kit/core';
import ItemsCategories from '../components/ItemsCategories';
import Items from '../components/Items';
import { useState } from 'react';

function Body() {
  const containers = ['To Do', 'In Progress', 'Done'];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const draggableMarkup = (
    <Items id="draggable">Drag me</Items>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        <ItemsCategories key={id} id={id}>
          {parent === id ? draggableMarkup : 'Drop here'}
          {id}
        </ItemsCategories>
      ))}
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const {over} = event;
    setParent(over ? over.id : null);
  }
}

export default Body
