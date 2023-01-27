import Model from './model/model.js';
import View from './view/view.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View(model);
    view.render();
});
