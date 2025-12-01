import { DndContext } from "@dnd-kit/core";
import "./App.css";
import { useEffect, useState } from "react";
import { useTaskStore } from "./hooks/task";
import ItemsCategories from "./components/ItemsCategories";
import { DropId, Status, Trash } from "./types";
import Items from "./components/Items";
import TransferCategory from "./components/TransferCategory";
import TrashIcon from "./components/TrashIcon";

function App() {
  const tasks = useTaskStore((s) => s.tasks);
  // const updateTask = useTaskStore((s) => s.update);
  const loadTask = useTaskStore((s) => s.load);
  // const removeTask = useTaskStore((s) => s.remove);
  const [middleIndex, setMiddleIndex] = useState(Math.floor(DropId.length / 2));
  const leftTransferCategory: DropId = DropId[middleIndex - 1];
  const rightTransferCategory: DropId = DropId[middleIndex + 1];
  // const [shownItemCategory, setShownItemCategory] = useState<Status>(
  //   Status[middleIndex]
  // );

  const status = Status[1];

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  return (
    <main className="h-[400px] w-[400px] relative">
      <button type="button" onClick={openMainWindow} className="">
        open window
      </button>
      <button type="button" onClick={() => changeCategory("left")} className="border">
        go left
      </button>
      <button
        type="button"
        onClick={() => changeCategory("right")}
        className="border"
      >
        go right
      </button>
      <DndContext>
        <TransferCategory
          id={`${leftTransferCategory} leftTransfer`}
          key={`${leftTransferCategory} leftTransfer`}
          mode="left"
          type={Trash.includes(leftTransferCategory) ? "danger" : "safe"}
        >
          {Trash.includes(leftTransferCategory) ? (
            <TrashIcon />
          ) : (
            leftTransferCategory
          )}
        </TransferCategory>
        <TransferCategory
          id={`${rightTransferCategory} rightTransfer`}
          key={`${rightTransferCategory} rightTransfer`}
          mode="right"
          type={Trash.includes(rightTransferCategory) ? "danger" : "safe"}
        >
          {Trash.includes(rightTransferCategory) ? (
            <TrashIcon />
          ) : (
            rightTransferCategory
          )}
        </TransferCategory>
        <ItemsCategories id={status} key={status}>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <Items key={task.id} id={task.id} value={task.details} />
            ))}
        </ItemsCategories>
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
