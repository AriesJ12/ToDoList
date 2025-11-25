const Status = ["To Do", "In Progress", "Done"] as const;

interface Task {
    id: string;
    title: string;
    description: string;
    status: (typeof Status)[number]; 
}

interface Column {
    id: number,
    title: string,
    description: string,
    tasks: Task[]
}

export { Status };
export type { Task, Column };
 