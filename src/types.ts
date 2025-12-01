const Status = ["To Do", "In Progress", "Done"] as const;
export type Status = (typeof Status)[number];

export const Trash = ["trash1" , "trash2"]
export type Trash = (typeof Trash)[number]; 

export const DropId = ["trash1", ...Status, "trash2"] as const;
export type DropId = (typeof DropId)[number];

interface Task {
    id: string;
    details: string;
    status: Status; 
}

export { Status };
export type { Task };
 