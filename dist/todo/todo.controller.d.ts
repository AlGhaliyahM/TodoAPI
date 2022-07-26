import { TodoService } from './todo.service';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    postTask(): {
        result: string;
    };
    getTask(): {
        result: string;
    };
    getAllTask(): {
        result: string;
    };
}
