import { Person } from "../../persons/interface/Person";


export interface Task {
    id: number;
    name: string;
    dueDate: Date;
    completed: boolean;
    persons: Person[]
}