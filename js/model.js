export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length === 0) {
            this.todos = [{
                id: 0,
                title: 'Aprende JS',
                description: 'Mira tutoriales',
                completed: false,
            }];
            this.currentId = 1;
        } else {
            this.currentId = this.todos[this.todos.length -1].id +1;
        }
    }

    setView(view) {
        this.view = view;
    }

    getTodos () {
        return this.todos;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    addTodo (title, description) {
        const todo = {  
            id: this.currentId++,
            title, // equvalente a title: title,
            description, // equivalente a description: description,
            completed: false
        };
        this.todos.push(todo);
        console.log(this.todos);
        this.save();
        return {...todo}; // devuelve un clon de todo
    }

    findTodo (id) {
        return this.todos.findIndex((todo) => todo.id === id);
    }

    removeTodo (id) {
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        this.todos[index].completed = !this.todos[index].completed;
        this.save();
    }
}
