//Class for create card

class Card {
    constructor(data, templateSelector = '#place') {
        this._data = data;
        this._templateSelector = templateSelector;
    }

    _getTemplate(){
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);

        return cardElement;
    }

    createCard(){
        this._element = this._getTemplate();

        this._element.querySelector(".place__img").src = this._data.link;
        this._element.querySelector(".place__img").alt = this._data.name;
        this._element.querySelector(".place__title").textContent = this._data.name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".place__button_like").addEventListener('click', () => {
            this._handleLikeButton();
        })
        this._element.querySelector(".place__button_delete").addEventListener('click', ()=> {
            this._handleDeleteButton();
        })
        this._element.querySelector(".place__img").addEventListener('click', ()=> {
            this._handleImageViewerPopup();
        })
    }

    _handleLikeButton(){
        this._element.querySelector(".place__button_like").classList.toggle("place__button_like-active");
    }

    _handleDeleteButton(){
        this._element.remove();
    }

    _handleImageViewerPopup(){
        imgView(this._data.link, this._data.name);
    }
}

export { Card };