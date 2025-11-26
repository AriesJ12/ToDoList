import { Status, type Task } from "../types";

import { create } from "zustand";

const STORAGE_KEY = "tasks";

interface TaskStore {
  tasks: Task[];

  load: () => Promise<void>;
  add: (task: Task) => void;
  update: (task: Task) => void;
  remove: (id: string) => void;
}

const saveToChrome = (tasks: Task[]) =>
  chrome.storage.local.set({ [STORAGE_KEY]: tasks });

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  load: async () => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      const raw = result[STORAGE_KEY];

      const tasks = Array.isArray(raw) ? (raw as Task[]) : [];

      set({ tasks });
    });
  },

  /* Add a task */
  add: (task) => {
    const newTasks = [...get().tasks, task];
    set({ tasks: newTasks });
    saveToChrome(newTasks);
  },

  /* Update task */
  update: (updated) => {
    const newTasks = get().tasks.map((t) =>
      t.id === updated.id ? updated : t
    );
    set({ tasks: newTasks });
    saveToChrome(newTasks);
  },

  /* Remove task */
  remove: (id) => {
    const newTasks = get().tasks.filter((t) => t.id !== id);
    set({ tasks: newTasks });
    saveToChrome(newTasks);
  },
}));

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEY]) {
    const raw = changes[STORAGE_KEY].newValue;
    const newTasks = Array.isArray(raw) ? (raw as Task[]) : [];

    useTaskStore.setState({ tasks: newTasks });
  }
});
