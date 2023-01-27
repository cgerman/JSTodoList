import Todos from "./todos/todos.js";

export default class Model {
    constructor () {
        this.todos = new Todos();
    }
}