const Status = ["To Do", "In Progress", "Done"] as const;
export type Status = (typeof Status)[number];

interface Task {
    id: string;
    details: string;
    status: Status; 
}

export { Status };
export type { Task };
 