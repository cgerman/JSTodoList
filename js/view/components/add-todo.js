import Alert from "./alert.js";
export default class AddTodoForm {
    constructor() {
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.btn = document.getElementById('add');
        this.alert = new Alert('alert');
    }

    setOnClick(callback) {
        this.btn.onclick = () => {
            if (this.title.value === '' || this.description.value === '') {
                this.alert.show('Title and description are both required');
            } else {
                this.alert.hide();
                callback(this.title.value, this.description.value);
            }

        }
    }
}