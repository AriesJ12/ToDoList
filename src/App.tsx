import './App.css'

import {DndContext, type DragEndEvent} from '@dnd-kit/core';
import ItemsCategories from './components/ItemsCategories';
import Items from './components/Items';
import { useState } from 'react';

function App() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Items>Drag me</Items>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <ItemsCategories>
        {isDropped ? draggableMarkup : 'Drop here'}
      </ItemsCategories>
    </DndContext>
  )

  function handleDragEnd(event: DragEndEvent ) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }
}

export default App
