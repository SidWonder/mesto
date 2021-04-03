export default class Section {
    constructor({ renderer }, containerSelector) {
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

    renderItems(data) {
        this.clear();
        data.forEach(item => {
            this._renderer(item);
        });
    }

}
