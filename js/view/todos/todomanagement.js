import AddTodoForm from "./add-todo.js";
import Filters from "./filters.js";
import Table from "./table.js";

export default class TodoManagementUC {
    constructor(todos) {
        this.todos = todos;
        this.table = new Table(todos.getAllTodos());
        this.table.setOnToggleCompleted((id) => this.toggleCompleted(id));
        this.table.setOnUpdate((id, values) => this.updateTodo(id, values));
        this.table.setOnDelete((id) => this.removeTodo(id));
        this.addTodoForm = new AddTodoForm();
        this.addTodoForm.setOnValidatedInput((title, description) => this.addTodo(title, description));
        this.filters = new Filters();
        this.filters.setOnSearckClick((filters) => this.filterTodos(filters));
    }

    render() {
        this.table.render();
        this.filters.render();
        this.addTodoForm.render();
    }

    addTodo(title, description) {
        const todo = this.todos.addTodo(title, description);
        this.table.appendRow(todo);
        console.log(todo);
    }

    updateTodo(id, values) {
        const todo = this.todos.findTodo(id);
        console.log (todo);
        todo.update(values);
    }

    removeTodo(id) {
        this.todos.removeTodo(id);
    }

    filterTodos(filters) {
        this.table.filterRows(filters);
    }

    toggleCompleted(id) {
        this.todos.findTodo(id).toggleCompleted();
    }
}