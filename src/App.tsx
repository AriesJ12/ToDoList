import { DndContext, DragOverlay } from "@dnd-kit/core";
import "./App.css";
import { useEffect, useState } from "react";
import { useTaskStore } from "./hooks/task";
import ItemsCategories from "./components/ItemsCategories";
import { DropId, Status, Trash } from "./types";
import Items from "./components/Items";
import TransferCategory from "./components/TransferCategory";
import TrashIcon from "./components/TrashIcon";
import ItemDesign from "./components/ItemDesign";
import { useTaskDrag } from "./hooks/taskDrag";

function App() {
  const tasks = useTaskStore((s) => s.tasks);
  const loadTask = useTaskStore((s) => s.load);

  const [middleIndex, setMiddleIndex] = useState(Math.floor(DropId.length / 2));
  const leftTransferCategory: DropId = DropId[middleIndex - 1];
  const rightTransferCategory: DropId = DropId[middleIndex + 1];
  const shownItemCategory = DropId[middleIndex] as Status;

  const { activeId, handleDragStart, handleDragEnd, getActiveTaskDetails } =
    useTaskDrag();

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  return (
    <main className="relative h-[550px] w-[500px] bg-third px-10 flex flex-col justify-center">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <TransferCategory
          id={`${leftTransferCategory}`}
          key={`${leftTransferCategory} leftTransfer`}
          mode="left"
          type={Trash.includes(leftTransferCategory) ? "danger" : "safe"}
          onClick={() => {
            changeCategory("left");
          }}
          className={
            Trash.includes(leftTransferCategory)
              ? undefined
              : "hover:cursor-pointer"
          }
          style={{ writingMode: "sideways-lr" }}
        >
          {Trash.includes(leftTransferCategory) ? (
            <TrashIcon />
          ) : (
            leftTransferCategory
          )}
        </TransferCategory>
        <TransferCategory
          id={`${rightTransferCategory}`}
          key={`${rightTransferCategory} rightTransfer`}
          mode="right"
          type={Trash.includes(rightTransferCategory) ? "danger" : "safe"}
          onClick={() => {
            changeCategory("right");
          }}
          className={
            Trash.includes(rightTransferCategory)
              ? undefined
              : "hover:cursor-pointer"
          }
          style={{ writingMode: "vertical-rl" }}
        >
          {Trash.includes(rightTransferCategory) ? (
            <TrashIcon />
          ) : (
            rightTransferCategory
          )}
        </TransferCategory>
        <ItemsCategories id={shownItemCategory} key={shownItemCategory} headerOnClick={openMainWindow}>
          {tasks
            .filter((task) => task.status === shownItemCategory)
            .map((task) => (
              <Items key={task.id} id={task.id} value={task.details} />
            ))}
        </ItemsCategories>

        <DragOverlay>
          {activeId ? (
            <ItemDesign>{`${getActiveTaskDetails(activeId)}`}</ItemDesign>
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );

  function openMainWindow() {
    const url = chrome.runtime.getURL("src/main/index.html");
    chrome.tabs.create({ url });
  }

  function changeCategory(type: "left" | "right") {
    setMiddleIndex((prev) => {
      if (type === "left") return Math.max(prev - 1, 1);
      if (type === "right") return Math.min(prev + 1, DropId.length - 2);
      return prev;
    });
  }
}

export default App;
