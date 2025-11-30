const Status = ["To Do", "In Progress", "Done"] as const;
export type Status = (typeof Status)[number];

export const Trash = "trash";
export type Trash = typeof Trash; 

export type DropId = Status | Trash;

interface Task {
    id: string;
    details: string;
    status: Status; 
}

export { Status };
export type { Task };
 