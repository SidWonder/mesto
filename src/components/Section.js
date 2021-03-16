export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
    }

    addItem(element, place = 'prepend') {
        if (place === 'append') {
            this._container.append(element);
        } else {
            this._container.prepend(element);
        }
    }

    renderItems() {
        this.clear();

        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

}
