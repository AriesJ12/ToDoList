const Status = ["To Do", "In Progress", "Done"] as const;
export type Status = (typeof Status)[number];

interface Task {
    id: string;
    details: string;
    status: Status; 
}

interface Column {
    id: number,
    title: string,
    description: string,
    tasks: Task[]
}

export { Status };
export type { Task, Column };
 