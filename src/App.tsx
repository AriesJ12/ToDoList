import { DndContext } from "@dnd-kit/core";
import "./App.css";
import { useEffect } from "react";
import { useTaskStore } from "./hooks/task";
import ItemsCategories from "./components/ItemsCategories";
import { Status } from "./types";
import Items from "./components/Items";

function App() {
  const tasks = useTaskStore((s) => s.tasks);
  // const updateTask = useTaskStore((s) => s.update);
  const loadTask = useTaskStore((s) => s.load);
  // const removeTask = useTaskStore((s) => s.remove);

  const status = Status[1];

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  return (
    <>
      <button type="button" onClick={openMainWindow} className="">
        open window
      </button>
      <DndContext>
        <main>
          <ItemsCategories id={status} key={status}>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <Items key={task.id} id={task.id} value={task.details} />
              ))}
          </ItemsCategories>
        </main>
      </DndContext>
    </>
  );

  function openMainWindow() {
    const url = chrome.runtime.getURL("src/main/index.html");
    chrome.tabs.create({ url });
  }
}

export default App;
