import Todo from "./todo.js";

export default class Todos {
    constructor() {
        this.todos = [];
        const tds = JSON.parse(localStorage.getItem('todos'));
        if (!tds || tds.length === 0) {
            this.todos = [new Todo({ id: 0, title: 'Aprende JS', description: 'Mira tutoriales' })];
            this.currentId = 1;
        } else {
            tds.forEach(obj => { this.todos.push(new Todo(obj)); });
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    getAllTodos() {
        return this.todos;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo(title, description) {
        const todo = new Todo({ id: this.currentId++, title, description });
        this.todos.push(todo);
        this.save();
        return { ...todo }; // devuelve un clon de todo
    }

    findTodo(id) {
        return this.todos.find((todo) => todo.id === id);
    }

    updateTodo(id, values) {
        const index = this.findTodo(id);
        this.todos[index].update(values);
        this.save();
    }

    removeTodo(id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        this.todos[index].toggleCompleted();
        this.save();
    }
}
