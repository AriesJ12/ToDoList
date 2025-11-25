const Status = {
    todo: 1,
    in_progress: 2,
    done: 3
} as const;

interface Task {
    id: number;
    title: string;
    description: string;
    status: typeof Status[keyof typeof Status]; 
}

interface Column {
    id: number,
    title: string,
    description: string,
    tasks: Task[]
}

export { Status };
export type { Task, Column };
 