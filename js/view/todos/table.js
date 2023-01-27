import Modal from "./modal.js";

export default class Table {
    constructor(todos) {
        this.todos = todos;
        this.table = document.getElementById('table');
        this.modal = new Modal();
        this.modal.setOnValidatedInput((id, values) => this.updateRow(id, values));
    }

    render() {
        this.todos.forEach((todo) => this.appendRow(todo));
        this.modal.render();
    }

    setOnToggleCompleted(callback) {
        this.onToggleCompletedCallback = callback;
    }

    setOnUpdate(callback) {
        this.onUpdateCallback = callback;
    }

    setOnDelete(callback) {
        this.onDeleteCallback = callback;
    }

    appendRow(todo) {
        const row = this.table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
                
            </td>
            <td class="text-right">
            </td>
        `;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = () => this.modal.setValues(todo);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeRow(todo.id);
        row.children[3].appendChild(removeBtn);
    }

    removeRow(id) {
        this.onDeleteCallback(id);

        const row = document.getElementById(id);
        row.remove();
    }

    toggleCompleted(id) {
        this.onToggleCompletedCallback(id);
    }

    updateRow(id, values) {
        this.onUpdateCallback(id, values);

        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    filterRows(filters) {
        const { type, words } = filters;
        const [, ...rows] = this.table.getElementsByTagName('tr');
        for (const row of rows) {
            const [title, description, completed] = row.children;
            let shouldHide = false;
            if (words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = (type === 'completed');
            const isCompleted = completed.children[0].checked;

            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }

            if (shouldHide) {
                row.classList.add('d-none');
            } else {
                row.classList.remove('d-none');
            }
        }
    }

}