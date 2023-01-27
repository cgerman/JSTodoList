export default class Todo {
    constructor(obj) {
        this.id = obj.id;
        this.update(obj);
    }

    update(values) {
        this.title = values.title;
        this.description = values.description;
        this.completed = values.completed ? values.completed : false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}