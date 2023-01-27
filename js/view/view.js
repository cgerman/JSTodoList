import TodoManagementUC from "./todos/todomanagement.js";
export default class View {
    constructor(model) {
        this.model = model;
        this.todoManagementUC = new TodoManagementUC(model.todos);        
     }

     render() {
        this.todoManagementUC.render();
     }
}
